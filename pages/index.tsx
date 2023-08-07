import { gql, useQuery } from "@apollo/client";

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
      <ul>
        {data.countries.map((country: any) => (
          <li>{country.name}</li>
        ))}
      </ul>
    </main>
  );
}
