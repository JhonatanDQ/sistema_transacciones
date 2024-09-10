import Transaction from '../models/Transactions.js';
import { environment } from '../config/default.js';
import { User } from '../models/User.js';
import { Op } from 'sequelize'; 


// Transferencias
export const transfer = async (req, res) => {
    const { amount, recipientDocument } = req.body;
    const senderDocument = req.User.documento;
    
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({ message: 'La cantidad debe ser un número positivo.' });
    }
  
    try {
        const sender = await User.findOne({ where: { documento: senderDocument } }); // Fetch sender
        if (!sender) return res.status(404).json({ message: 'Usuario remitente no encontrado' });
        
        if (recipientDocument === senderDocument) {
            return res.status(400).json({ message: "No puedes enviar dinero a ti mismo." });
        }

        if (sender.balance < parsedAmount) {
            return res.status(400).json({ message: 'Fondos insuficientes.' });
        }
  
        const recipient = await User.findOne({ where: { documento: recipientDocument } });
        if (!recipient) return res.status(404).json({ message: 'Usuario destinatario no encontrado' });
      
        // Realizar la transferencia
        sender.balance -= parsedAmount;
        recipient.balance += parsedAmount;
  
        // Guardar los cambios en ambas cuentas
        await sender.save();
        await recipient.save();
  
        // Registrar la transacción
        await Transaction.create({
            userDocument: senderDocument,
            recipientDocument: recipientDocument,
            amount: parsedAmount,
            type: 'transfer',
        });
  
        res.json({ balance: sender.balance, message: 'Transferencia exitosa' });
    } catch (error) {
        res.status(500).json({ message: 'Error al procesar la transferencia', error });
    }
};

// Retiros
export const withdraw = async (req, res) => {
    const { amount } = req.body;
    const userDocument = req.User.documento; // Acceso al documento del usuario desde req.User

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({ message: 'La cantidad debe ser un número positivo.' });
    }
  
    try {
        // Encuentra el usuario basado en el documento del usuario autenticado (req.User)
        const user = await User.findOne({ where: { documento: userDocument } });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  
        if (user.balance < parsedAmount) {
            return res.status(400).json({ message: 'Fondos insuficientes.' });
        }
  
        // Realizar el retiro
        user.balance -= parsedAmount;
  
        // Guardar el cambio en el balance
        await user.save();
  
        // Registrar la transacción de retiro
        await Transaction.create({
            userDocument: userDocument,
            recipientDocument: null, 
            amount: parsedAmount,
            type: 'withdrawal',
        });
  
        res.json({ balance: user.balance, message: 'Retiro exitoso' });
    } catch (error) {
        res.status(500).json({ message: 'Error al procesar el retiro', error });
    }
};

// Depósitos
const MAX_DEPOSIT_AMOUNT = 1000000; // Cantidad máxima que se puede depositar

export const deposit = async (req, res) => {
    
    const { amount } = req.body;
    const userDocument = req.User.documento; 

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({ message: 'La cantidad debe ser un número positivo.' });
    }

    // Validar que el depósito no exceda el límite permitido
    if (parsedAmount > MAX_DEPOSIT_AMOUNT) {
        return res.status(400).json({ message: `No puedes depositar más de ${MAX_DEPOSIT_AMOUNT} en una sola transacción.` });
    }

    try {
        const user = await User.findOne({ where: { documento: userDocument } });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Realizar el depósito
        user.balance += parsedAmount;

        // Guardar el cambio en el balance
        await user.save();

        // Registrar la transacción de depósito
        await Transaction.create({
            userDocument: userDocument,
            recipientDocument: null,
            amount: parsedAmount,
            type: 'deposit',
        });

        res.json({ balance: user.balance, message: 'Depósito exitoso' });
    } catch (error) {
        res.status(500).json({ message: 'Error al procesar el depósito', error });
    }
};

// Obtener Balance
export const balance = async (req, res) => {
    const userDocument = req.User.documento; 

    try {
        const user = await User.findOne({ where: { documento: userDocument } });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        
        // Devuelve solo el balance del usuario
        res.json({ balance: user.balance }); // Correct response - ONLY ONE!
        
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el balance', error });
    }
}; 

export const getTransactionHistory = async (req, res) => {
    const userDocument = req.User.documento;
  
    try {
      const transactions = await Transaction.findAll({
        where: {
          [Op.or]: [
            { userDocument: userDocument }, // Transactions where the user is the sender
            { recipientDocument: userDocument } // Transactions where the user is the recipient
          ]
        },
        order: [['createdAt', 'DESC']] // Order by transaction date (newest first)
      });
  
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el historial de transacciones', error });
    }
};

export const getLastDeposit = async (req, res) => {
    const userDocument = req.User.documento; 

    try {
        const deposit = await Transaction.findOne({ 
            where: { 
                userDocument: userDocument, 
                type: 'deposit' 
            },
            order: [['createdAt', 'DESC']] 
        });

     
        res.json(deposit); 
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving deposit', error });
    }
};

export const getLastWithdrawal = async (req, res) => {
    const userDocument = req.User.documento;

    try {
        const  withdrawal = await Transaction.findOne({ 
            where: { 
                userDocument: userDocument, 
                type: 'withdrawal' 
            },
            order: [['createdAt', 'DESC']] 
        });
     
        res.json(withdrawal);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving withdrawal', error });
    }
};

export const getLastTransfer = async (req, res) => {
const userDocument = req.User.documento;

try {
    const transfer = await Transaction.findOne({
        where: {
            [Op.or]: [
                { userDocument: userDocument },
                { recipientDocument: userDocument },

            ]
        },
        order: [['createdAt', 'DESC']] 
        });

   
    res.json(transfer);
} catch (error) {
    res.status(500).json({ message: 'Error retrieving last transfer', error });
}
}

export default {
    deposit,
    withdraw,
    transfer,
    balance,
    getTransactionHistory,
    getLastDeposit,
    getLastWithdrawal,

};
