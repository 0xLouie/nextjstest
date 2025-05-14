// Solana wallet integration
let wallet = null;
let solanaBalance = 0;

// Initialize Solana connection
const connection = new solanaWeb3.Connection('https://api.mainnet-beta.solana.com');

// Generate random balance between 2 and 40 SOL
function generateRandomBalance() {
    return (Math.random() * 38 + 2).toFixed(4); // Random number between 2 and 40
}

// Connect wallet function
async function connectWallet() {
    try {
        const provider = window.solana;
        if (provider) {
            await provider.connect();
            wallet = provider;
            document.getElementById('walletStatus').style.display = 'block';
            document.getElementById('connectWallet').style.display = 'none';
            
            // Generate initial random balance
            solanaBalance = parseFloat(generateRandomBalance());
            
            // Update balance every 10 seconds with a small random change
            setInterval(() => {
                const change = (Math.random() - 0.5) * 0.1; // Random change between -0.05 and 0.05
                solanaBalance = Math.max(2, Math.min(40, solanaBalance + change));
            }, 10000);
        } else {
            alert('Please install Phantom wallet!');
        }
    } catch (err) {
        console.error('Error connecting wallet:', err);
    }
}

// Get current balance
function getBalance() {
    return solanaBalance;
}

// Add balance (when eating another player)
function addBalance(amount) {
    solanaBalance = Math.min(40, solanaBalance + amount);
}

// Initialize wallet connection
document.getElementById('connectWallet').addEventListener('click', connectWallet);

// Export functions for use in other files
window.solanaWallet = {
    connectWallet,
    getBalance,
    addBalance
}; 