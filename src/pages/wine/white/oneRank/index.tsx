import { client } from 'src/libs/client';


export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: `whitewine`,
  });

  return {
    props: {
      data,
    },
  };
};

const OneRank: React.FC = (props: any) => {
  const { data } = props;

  const keyRank = '1ランク';
  const oneRankData = data.contents?.filter(
    (data: any) => data.rank[0] === keyRank
  );

  // console.log(oneRankData?.image?.url);

  // console.log(oneRankData[2].image.ur);
  


  return (
    <div>
      {oneRankData?.map((data: any) => (
        <div key={data.id}>
          {/* <img src={data?.image ? data.image.url : 'image/ikgroup-wineimage.jpg'} alt="ワインの画像です" /> */}
          <h1>{data.name}</h1>
          <p>{data.variety}</p>
          <p>{data.origin}</p>
          <p>{data.taste}</p>
        </div>
      ))}
      <img src="/public/image/ikgroup-wineimage.jpg" alt="aaaaa" />
    </div>
  );
};

export default OneRank;
