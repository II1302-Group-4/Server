export const getCurrentData = (req, res) => {
    try {
        // Egentligen databascall här
        const value = Math.floor(Math.random() * 10)
        setTimeout(() => { res.status(200).json(value) }, 1000)
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}