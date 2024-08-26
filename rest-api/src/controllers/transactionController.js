<<<<<<< HEAD
import User from '../models/User.js';
import Transaction from '../models/Transactions.js';

export const transfer = async (req, res) => {
    const { amount, recipientDocument } = req.body;
    const senderDocument = req.User.documento; 

    if(recipientDocument==senderDocument){
        return res.status(400).json({message: "No puedes enviar dinero a ti mismo."})
    }
  
    if (amount <= 0) {
      return res.status(400).json({ message: 'La cantidad debe ser positiva.' });
    }
  
    try {
      
      const sender = req.User;
  
      if (sender.balance < amount) {
        return res.status(400).json({ message: 'Fondos insuficientes.' });
      }
  
      const recipient = await User.findOne({ where: { documento: recipientDocument } });
      if (!recipient) return res.status(404).json({ message: 'Usuario destinatario no encontrado' });
  
      // Realizar la transferencia
      sender.balance -= amount;
      recipient.balance += amount;
  
      // Guardar los cambios en ambas cuentas
      await sender.save();
      await recipient.save();
  
      // Registrar la transacción
      await Transaction.create({
        userDocument: senderDocument,
        recipientDocument: recipientDocument,
        amount,
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
    const userDocument = req.User.documento; // Asegúrate de que req.User esté definido
  
    if (amount <= 0) {
      return res.status(400).json({ message: 'La cantidad debe ser positiva.' });
    }
  
    try {
      // Buscar al usuario
      const user = await User.findOne({ where: { documento: userDocument } });
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  
      if (user.balance < amount) {
        return res.status(400).json({ message: 'Fondos insuficientes.' });
      }
  
      // Realizar el retiro
      user.balance -= amount;
  
      // Guardar el cambio en el balance
      await user.save();
  
      // Registrar la transacción de retiro
      await Transaction.create({
        userDocument: userDocument,
        recipientDocument: null, 
        amount,
        type: 'withdrawal',
      });
  
      res.json({ balance: user.balance, message: 'Retiro exitoso' });
    } catch (error) {
      res.status(500).json({ message: 'Error al procesar el retiro', error });
    }
  };
  
  // depositar monto de dinero

  export const deposit = async (req, res) => { 
    const { amount } = req.body;
  const userDocument = req.User.documento;
=======
// controllers/transactionController.js
import { Transaction } from '../models/Transaction.js';
import User from '../models/User.js';

export const transfer = async (req, res) => {
  const { amount, recipientDocument } = req.body;
  const senderDocument = req.user.documento;
>>>>>>> b417405f923b4c2e6d06d02e70b4132bf66c85ba

  if (amount <= 0) {
    return res.status(400).json({ message: 'La cantidad debe ser positiva.' });
  }

  try {
<<<<<<< HEAD
    // Buscar al usuario
    const user = await User.findOne({ where: { documento: userDocument } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Realizar el depósito
    user.balance += amount;

    // Guardar el cambio en el balance
    await user.save();

    // Registrar la transacción de depósito
    await Transaction.create({
      userDocument: userDocument,
      recipientDocument: null,  // Puedes usar null o algún valor representativo
      amount,
      type: 'deposit',
    });

    res.json({ balance: user.balance, message: 'Depósito exitoso' });
  } catch (error) {
    console.error("Error detallado:", error);
    res.status(500).json({ message: 'Error al procesar el depósito', error });
  }

  }
=======
    // Buscar usuarios
    const sender = await User.findOne({ where: { documento: senderDocument } });
    const recipient = await User.findOne({ where: { documento: recipientDocument } });

    if (!sender) return res.status(404).json({ message: 'Usuario remitente no encontrado.' });
    if (!recipient) return res.status(404).json({ message: 'Usuario destinatario no encontrado.' });

    // Verificar fondos suficientes
    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Fondos insuficientes.' });
    }

    // Realizar la transferencia
    sender.balance -= amount;
    recipient.balance += amount;

    // Guardar cambios
    await sender.save();
    await recipient.save();

    // Registrar transacción
    await Transaction.create({
      amount,
      type: 'transfer',
      userDocument: senderDocument,
      recipientDocument,
    });

    res.json({ balance: sender.balance, message: 'Transferencia exitosa.' });
  } catch (error) {
    console.error('Error al procesar la transferencia:', error);
    res.status(500).json({ message: 'Error al procesar la transferencia.', error });
  }
};
>>>>>>> b417405f923b4c2e6d06d02e70b4132bf66c85ba
