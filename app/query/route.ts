import { db } from "@vercel/postgres";

const client = await db.connect();

// import { neon } from "@neondatabase/serverless";


// if (!process.env.DATABASE_URL) {
//   throw new Error('DATABASE_URL is not defined');
// }
// const sql = neon(process.env.DATABASE_URL);

// const client = {sql};

async function listInvoices() {
	const data = await client.sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data.rows;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
  	return Response.json(await listInvoices());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
