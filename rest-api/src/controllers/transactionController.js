// import { User } from "../models/User.js";
// import { Transaction } from "../models/Transaction.js";


// export const transfer = async (req, res) => {
//   const { amount, recipientDocument } = req.body;
//   const senderDocument = req.User.documento; // Asegúrate de que req.user.documento esté definido

//   if (amount <= 0) {
//     return res.status(400).json({ message: 'La cantidad debe ser positiva.' });
//   }

//   try {
//     const sender = await User.findOne({ where: { documento: senderDocument } });
//     if (!sender) return res.status(404).json({ message: 'Usuario remitente no encontrado' });

//     if (sender.balance < amount) {
//       return res.status(400).json({ message: 'Fondos insuficientes.' });
//     }

//     const recipient = await User.findOne({ where: { documento: recipientDocument } });
//     if (!recipient) return res.status(404).json({ message: 'Usuario destinatario no encontrado' });

//     // Realizar la transferencia
//     sender.balance -= amount;
//     recipient.balance += amount;

//     // Guardar los cambios en ambas cuentas
//     await sender.save();
//     await recipient.save();

//     // Registrar la transacción
//     await Transaction.create({
//       userDocument: senderDocument,
//       recipientDocument: recipientDocument,
//       amount,
//       type: 'transfer',
//     });

//     res.json({ balance: sender.balance, message: 'Transferencia exitosa' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error al procesar la transferencia', error });
//   }
// };
