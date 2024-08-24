// controllers/transactionController.js
import { Transaction } from '../models/Transaction.js';
import User from '../models/User.js';

export const transfer = async (req, res) => {
  const { amount, recipientDocument } = req.body;
  const senderDocument = req.user.documento;

  if (amount <= 0) {
    return res.status(400).json({ message: 'La cantidad debe ser positiva.' });
  }

  try {
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
