import Form from '@/components/Form/Form'
import { GeistSans } from 'geist/font/sans'

interface FormPageProps {
  params: {
    id: string
  }
}

async function fetchData(id: string) {
  const res = await fetch(`http://localhost:3000/api/form/${id}`, {
    cache: 'no-store', 
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  console.log(res)
  return res.json()
}



const FormPage = async ({ params }: FormPageProps) => {
  const obj = await fetchData(params.id);

  return (
    <div className={GeistSans.className}>
      <Form obj={obj} />
    </div>
  );
};

export default FormPage;