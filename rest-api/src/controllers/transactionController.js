import User from '../models/User.js';
import Transaction from '../models/Transactions.js';
import { environment } from '../config/default.js';

// Transferencias
export const transfer = async (req, res) => {
    const { amount, recipientDocument } = req.body;
    const senderDocument = req.User.documento; 

    if(recipientDocument === senderDocument){
        return res.status(400).json({ message: "No puedes enviar dinero a ti mismo." });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({ message: 'La cantidad debe ser un número positivo.' });
    }
  
    try {
        const sender = req.User;
  
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
    const userDocument = req.User.documento; 

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({ message: 'La cantidad debe ser un número positivo.' });
    }
  
    try {
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
const MAX_DEPOSIT_AMOUNT = 1000000; //cantidad máxima que se puede depositar

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


// Balance
export const balance = async (req, res) => {
    // Obtener el documento del usuario autenticado
    const userDocument = req.User.documento;
    const balance = req.User.balance;

    try {
        userDocument = req.body.User
        // Encuentra el usuario basado en el documento del usuario autenticado
        const user = await User.findOne({ where: { documento: userDocument } });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        
        // Devuelve solo el balance del usuario
        res.json({ balance: User.balance });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el balance', error });
    }
};


// export const balance = async (req, res) => {
//     try {
//         const { amount } = req.body;
//         const userDocument = req.User.documento;
  
//       if (!userDocument) { 
//         res.status(404).json({ message: 'Usuario no encontrado' });

//          } if(userDocument){
//       // Lógica para obtener y devolver el balance del usuario
//       const balance = await Transaction.getBalance(userDocument.documento);
//       res.json({ amount });
//          }
//     } catch (err) {
//       res.status(500).json({ message: 'Error al obtener el balance' });
//     }
//   };
  
  


export default {
    transfer,
    withdraw,
    deposit,
    balance
}
