import { client } from '../../libs/client';

export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: 'wine',
  });

  return {
    props: {
      data,
    },
  };
};

const WinePage: React.FC = (props: any) => {
  const { data } = props;

  console.log(data.contents[0]);

  return (
    <div>
      {data.contents?.map((data: any) => (
        <div key={data.id}>
          <p>{data.name}</p>
          <p>{data.REDorWHITE}</p>
          <p>{data.taste}</p>
        </div>
      ))}
    </div>
  );
};


export default WinePage;
