import factory from "../components/factory";

export async function getStaticProps(context) {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return {
    props: { campaigns }, // will be passed to the page component as props
  };
}

const Home = ({ campaigns }) => {
  return (
    <div>
      <h1>{campaigns[0]}</h1>
    </div>
  );
};

export default Home;
