import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignUpForm";

export const CustomTabItemStyles = {
    _selected: {
        bg:"white",
        color:"black",
        shadow:"sm",
        rounded:"md",
        m: 1,
        fontWeight: 600,
    },
    width: "50%",
    color:"gray.500"

}

export const CustomTab = () => {
  return (
    <Tabs alignContent="center">
      <TabList background="gray.200" justifyContent={"center"} rounded={"md"}>
        <Tab {...CustomTabItemStyles}>Sign up</Tab>
        <Tab {...CustomTabItemStyles}>Log in</Tab>
      </TabList>
      <TabPanels>
      
      <TabPanel>
        <SignupForm />
      </TabPanel>
      <TabPanel>
        <LoginForm />
      </TabPanel>
      
      </TabPanels>
    </Tabs>

  );
};



