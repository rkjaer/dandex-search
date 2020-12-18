import * as React from "react";
import useGoogleSheets from "use-google-sheets";
import {
  Provider as BumbagProvider,
  List,
  Input,
  PageContent,
  Box,
  Spinner,
  Paragraph
} from "bumbag";

import "./styles.css";

export default function App() {
  const [filter, setFilter] = React.useState("");

  const { data, loading, error } = useGoogleSheets({
    apiKey: "AIzaSyCCHyfcFmdTdEzz1YE-Qmb3X3u3mBLFv2s",
    sheetId: "1aH9ANtUO1BvAgu5gdxH9cL5jGS6ZcdGHTPRAmAPTr6o"
  });

  const filteredResults = React.useMemo(() => {
    const rows = data[0] ? data[0].data : [];

    return rows.filter((row) =>
      Object.values(row)[0].toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  if (loading) {
    return (
      <Box height="300px" alignX="center" alignY="center">
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <BumbagProvider>
      <Box>
        <PageContent>
          <Box marginBottom="0.5rem">
            <Input
              autoFocus
              type="search"
              placeholder={`Søg i DanDex (${filteredResults.length} resultater) ...`}
              onChange={(event) => setFilter(event.currentTarget.value)}
            />
          </Box>

          <List>
            {filteredResults.map((row) => (
              <List.Item>{Object.values(row)}</List.Item>
            ))}
          </List>

          {filteredResults.length === 0 && (
            <Box height="300px" alignX="center" alignY="center">
              <Paragraph>Ingen resultater ...</Paragraph>
            </Box>
          )}
        </PageContent>
      </Box>
    </BumbagProvider>
  );
}
