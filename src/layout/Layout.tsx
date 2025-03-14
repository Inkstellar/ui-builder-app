import { Container, Stack } from "@mui/material";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import Canvas from "../components/Canvas";
import Library from "../components/Library";
import ComponentTree from "../components/ComponentTree";
import { DragDropProvider } from "../context/DragDropProvider";
import CodeGenerator from "../components/CodeGenerator";

const Layout = () => {


  return <Box sx={{ width: '100%' }}>
    <Header />
    <DragDropProvider>
      <Stack direction={'row'}>
        <ComponentTree />
        <Canvas />
        <Library />
      </Stack>
      <CodeGenerator nestedElements={{}} />
    </DragDropProvider>
  </Box>
}

export default Layout;
