import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

const COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      capital
      code
      continent {
        name
      }
    }
  }
`;

const COUNTRIES = gql`
  query Countries {
    countries {
      capital
      continent {
        name
      }
      name
      currency
      emoji
      code
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log({ data });

  return (
    <main>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto auto auto ",
          gap: 50,
          padding: 30,
          backgroundImage:
            "url(" +
            "https://i.pinimg.com/originals/6d/78/27/6d782724aa2571a4a8cf4bfb6b95b363.gif" +
            ")",
        }}
      >
        {data.countries.map((country: any) => (
          <Link
            style={{
              border: "3px solid black",
              width: 250,
              height: 250,
            }}
            href={country.code}
          >
            <div
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ fontSize: 100 }}>{country.emoji}</div>
              <div style={{ fontWeight: "bold", fontSize: 20 }}>
                {country.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
