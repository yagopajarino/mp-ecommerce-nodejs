var mercadopago = require("mercadopago");

const crear_pago = async (data) => {
  mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
    integrator_id: process.env.INTEGRATOR_ID,
  });

  const preference = {
    items: [
      {
        id: "1234",
        title: data.title,
        currency_id: "ARS",
        picture_url: `https://mp-checkout-pro.onrender.com${data.img.slice(1)}`,
        description: "Dispositivo móvil de Tienda e-commerce",
        quantity: parseInt(data.unit),
        unit_price: parseFloat(data.price),
      },
    ],
    payer: {
      name: "Lalo",
      surname: "Landa",
      email: process.env.EMAIL,
      phone: {
        area_code: "11",
        number: 48215403,
      },
      address: {
        street_name: "calle falsa",
        street_number: 123,
        zip_code: "1425",
      },
    },
    back_urls: {
      success: "https://mp-checkout-pro.onrender.com/success",
      failure: "https://mp-checkout-pro.onrender.com/failure",
      pending: "https://mp-checkout-pro.onrender.com/pending",
    },
    auto_return: "all",
    payment_methods: {
      excluded_payment_methods: [
        {
          id: "visa",
        },
      ],
      installments: 6,
    },
    notification_url: "https://mp-checkout-pro.onrender.com/webhook",
    external_reference: "yago977@hotmail.com",
  };

  // let preference = {
  //   items: [
  //     {
  //       title: "Mi producto",
  //       unit_price: 100,
  //       quantity: 1,
  //     },
  //   ],
  //   auto_return: "approved",
  //   back_urls: {
  //     success: "http://localhost:3000/success",
  //   },
  // };

  const response = await mercadopago.preferences.create(preference);
  return response;
};

exports.crear_pago = crear_pago;
