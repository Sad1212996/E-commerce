import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

const candidateUrls = [
  'https://ecommerce-backend-api.onrender.com/api/product',
  'https://mern-ecommerce-api.onrender.com/api/product',
  'https://ecommerce-api-vwz2.onrender.com/api/product',
  'https://ecommerce-backend.onrender.com/api/product'
];

async function check() {
  for (const url of candidateUrls) {
    try {
      console.log("Testing:", url);
      const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
      console.log("Success!", url, "Status:", res.status);
      const data = await res.json();
      console.log("Data:", data?.products?.length || data?.length || Object.keys(data));
    } catch (err) {
      console.log("Failed:", url, err.message);
    }
  }
}

check();
