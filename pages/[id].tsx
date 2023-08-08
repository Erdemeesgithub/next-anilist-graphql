import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

const COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      capital
      code
      continent {
        name
      }
      emoji
      currency
      languages {
        name
      }
      native
    }
  }
`;

export default function Country() {
  const router = useRouter();

  const { loading, error, data } = useQuery(COUNTRY, {
    variables: {
      code: `${router.query.id}`,
    },
  });
  console.log(data);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          gap: 200,
          height: "100vh",
          backgroundImage:
            "url(" +
            "https://i.pinimg.com/originals/6d/78/27/6d782724aa2571a4a8cf4bfb6b95b363.gif" +
            ")",
          color: "#FAA0A0",
        }}
      >
        <div style={{ fontSize: 300 }}>{data.country.emoji}</div>
        <div style={{ flexDirection: "column" }}>
          <div style={{ fontWeight: "bold", fontSize: 70 }}>
            {data.country.capital}
          </div>
          <div style={{ fontWeight: "600", fontSize: 40 }}>
            continent: {data.country.continent.name}
          </div>
          <div style={{ fontWeight: "600", fontSize: 40 }}>
            currency: {data.country.currency}
          </div>
          <div style={{ fontWeight: "600", fontSize: 40 }}>
            languages:
            {data.country.languages.map((language: any) => (
              <div style={{ fontWeight: 300 }}> -{language.name}</div>
            ))}
          </div>
          <div style={{ fontWeight: "600", fontSize: 40 }}>
            native: {data.country.native}
          </div>
        </div>
      </div>
    </>
  );
}
