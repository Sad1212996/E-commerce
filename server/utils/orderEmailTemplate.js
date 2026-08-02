const OrderConfirmationEmail = (username, orders) => {
    const formattedTotal = (orders?.totalAmt || orders?.products?.reduce((sum, item) => sum + (parseFloat(item.subTotal) || (parseFloat(item.price) * parseInt(item.quantity)) || 0), 0) || 0).toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: #4CAF50;
            color: white;
            padding: 14px;
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
        }
        .order-details {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        .order-details th, .order-details td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }
        .order-details th {
            background: #f8f8f8;
        }
        .total-row td {
            font-weight: bold;
            background-color: #fafafa;
        }
        .footer {
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #666;
            border-top: 1px solid #eee;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">Order Confirmation (ยืนยันคำสั่งซื้อ)</div>
        <div class="content">
            <p>Dear <strong>${username}</strong>,</p>
            <p>Thank you for your order! Below are your order details:</p>

            <table class="order-details">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders?.products?.map((product) => {
                        const itemSubtotal = parseFloat(product?.subTotal) || (parseFloat(product?.price) * parseInt(product?.quantity)) || 0;
                        return `
                        <tr>
                            <td>${product?.productTitle || product?.name}</td>
                            <td>${product?.quantity}</td>
                            <td>฿${itemSubtotal.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        `;
                    }).join("")}
                    <tr class="total-row">
                        <td colspan="2" style="text-align: right;">Total (ยอดรวมทั้งสิ้น):</td>
                        <td>฿${formattedTotal}</td>
                    </tr>
                </tbody>
            </table>

            <p style="margin-top: 20px;"><strong>Order ID:</strong> #${orders?._id}</p>
            <p><strong>Payment Method:</strong> ${orders?.paymentMethod || 'COD'}</p>
            <p><strong>Estimated Delivery:</strong> 2-3 business days</p>
            
            <p>If you have any questions, feel free to contact us.</p>
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Classy Bites. All rights reserved.
        </div>
    </div>
</body>
</html>`;
};

export default OrderConfirmationEmail;

