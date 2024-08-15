import { User, Transaction } from '../models/index.js';

export const withdraw = async (req, res) => {
    const { amount } = req.body;

    try {
        const user = await User.findByPk(req.userId);

        if (user.balance < amount) {
            return res.status(400).json({ error: 'Insufficient funds' });
        }

        user.balance -= parseFloat(amount);
        await user.save();

        await Transaction.create({ userId: user.id, amount, type: 'withdraw' });
        res.json({ balance: user.balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deposit = async (req, res) => {
    const { amount } = req.body;

    try {
        const user = await User.findByPk(req.userId);

        user.balance += parseFloat(amount);
        await user.save();

        await Transaction.create({ userId: user.id, amount, type: 'deposit' });
        res.json({ balance: user.balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const transfer = async (req, res) => {
    const { amount, cedula } = req.body;

    try {
        const user = await User.findByPk(req.userId);
        const recipient = await User.findOne({ where: { cedula } });

        if (!recipient) {
            return res.status(404).json({ error: 'Recipient not found' });
        }

        if (user.balance < amount) {
            return res.status(400).json({ error: 'Insufficient funds' });
        }

        user.balance -= parseFloat(amount);
        recipient.balance += parseFloat(amount);
        await user.save();
        await recipient.save();

        await Transaction.create({
            userId: user.id,
            amount,
            type: 'transfer',
            toUserId: recipient.id
        });

        res.json({ balance: user.balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
