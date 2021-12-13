import { client } from 'src/libs/client';

export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: `whitewine`,
  });

  const sampleImage = await client.get({
    endpoint: 'wineimage',
  });

  return {
    props: {
      data,
      sampleImage,
    },
  };
};

const OneRank: React.FC = (props: any) => {
  const { data } = props;
  const { sampleImage } = props;

  const keyRank = '1ランク';
  const oneRankData = data.contents?.filter(
    (data: any) => data.rank[0] === keyRank
  );

  return (
    <div className="h-screen">
      {oneRankData?.map((data: any) => (
        <div
          className="h-1/3 flex justify-around items-center bg-blue-100 mb-6"
          key={data.id}
        >
          <div>
            <img
              className="w-60 h-60 object-cover rounded-lg"
              src={data?.image ? data.image.url : sampleImage.wineImage.url}
              alt="ワインの画像です"
            />
          </div>
          <dl className="flex flex-wrap tracking-wide w-1/2">
            <dt className="leading-relaxed flex w-3/12 font-bold">
              ワイン名 :{' '}
            </dt>
            <dd className="leading-relaxed w-9/12">{data.name}</dd>
            <dt className="leading-relaxed flex w-3/12 font-bold">品種 : </dt>
            <dd className="leading-relaxed w-9/12">{data.variety}</dd>
            <dt className="leading-relaxed flex w-3/12 font-bold">産地 : </dt>
            <dd className="leading-relaxed w-9/12">{data.origin}</dd>
            <dt className="leading-relaxed flex w-3/12 font-bold">味わい : </dt>
            <dd className="leading-relaxed w-9/12">{data.taste}</dd>
            {data.producer ? (
              <>
                <dt className="flex w-3/12 font-bold">生産者 : </dt>
                <dd className="w-9/12">{data.producer}</dd>
              </>
            ) : null}
            {data.remarks ? (
              <>
                <dt className="flex w-3/12 font-bold">備考 : </dt>
                <dd className="w-9/12">{data.remarks}</dd>
              </>
            ) : null}
          </dl>
        </div>
      ))}
    </div>
  );
};

export default OneRank;
