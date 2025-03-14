import { Container, Stack } from "@mui/material";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import Canvas from "../components/Canvas/Canvas";
import Library from "../components/Library/Library";
import ComponentTree from "../components/ComponentTree/ComponentTree";
import { DragDropProvider } from "../context/DragDropProvider";
import CodeGenerator from "../components/CodeGenerator/CodeGenerator";

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
