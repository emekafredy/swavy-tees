
const getOrders = (orders) => {
  const orderDetails = orders.map(order => `<tr>
      <td style="text-align: left; padding: 2rem;">${order.product_name}</td>
      <td style="text-align: left; padding: 2rem;">${order.attributes.split(',')[1]}</td>
      <td style="text-align: left; padding: 2rem;">${order.attributes.split(',')[0]}</td>
      <td style="text-align: left; padding: 2rem;">${order.quantity}</td>
      <td style="text-align: left; padding: 2rem;">${`$${order.total_amount}`}</td>
    </tr>`);
  return orderDetails;
};

const emailTemplate = {
  orderConfirmationTemplate: (name, orders) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Swavy | Tees</title>
      <style>
        .container {
          padding: 2rem;
          max-width: 60%;
          margin: auto;
          margin-top: 3rem;
          border: 2px solid black;
        }

        .header {
          background: #fff;
          border: 2px solid black;
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
        }

        .message-title {
          font-size: 1.4rem;
        }

        .message {
          font-size: 0.8rem;
          font-style: italic;
        }

        .title-span {
          font-size: 1.2rem;
        }

        .greetings {
          text-align: left;
          font-size: 1rem;
        }

        .button {
          box-sizing: border-box;
          border-color: #348eda;
          font-weight: 400;
          text-decoration: none;
          display: inline-block;
          color: #ffffff;
          background-color: #4CAF50;
          border: solid 1px #4CAF50;
          border-radius: 2px;
          font-size: 14px;
          padding: 12px 45px;
          border-radius: 5px;
          outline: none;
          cursor: pointer;
        }

        .button:hover {
          background-color: rgb(28, 82, 30);
        }

        table {
          border-collapse: collapse;
          width: 100%;
        }

        th, td {
          text-align: left;
          padding: 8px;
        }

        tr:nth-child(even){background-color: #f2f2f2}

        th {
          background-color: #4CAF50;
          color: white;
        }

        .link-div {
          text-align: center;
        }
      </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <p class="message-title">
              Swavy Tees Collections
              <br>
              <span class="title-span"> Order Confirmation </span> 
              <br>
              <span class="title-span"> Receipt: #${orders[0].reference} </span> 
            </p>
            <hr>
            <p class="greetings"> Hi ${name}, </p>
            <p class="message"> You order has been confirmed and your items are currently being processed for shipping. Find below, a summary of your order details </p>
          </div>
          <hr>
          <table>
              <tr>
                <th>Product</th>
                <th>Size</th>
                <th>Color</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
              ${getOrders(orders)}
          </table>
          <hr>
          <div class="link-div">
            <p> Please click on the link below to get more details about your order </p>
            <a class="button" href="https://swavy-tees.netlify.com/orders"> View Orders </a>
          </div>
        </div>
      </body>
    </html>
  `
};

export default emailTemplate;
