import React, { useEffect } from "react";
import { IntegryJS, Helpers } from "@integry/sdk";

import logo from "./logo.svg";
import "./App.css";

function App() {
  useEffect(() => {
    const init = async () => {
      // Fill these in from the SDK deployment page
      const appKey = "<APP_KEY>";
      const appSecret = "<APP_SECRET>";
      const userId = "<USER_ID>";
      const deploymentId = "<DEPLOY_ID>";

      // This is intended for use in testing only!
      // Please refer to docs.integry.io for more details
      const hash = await Helpers.getAuthHash(userId, appSecret);

      const integryHandle = new IntegryJS({
        appKey,
        hash,
        userId,
        deploymentId,
      });

      integryHandle.init({
        containerId: "my-sdk-container",
        renderMode: IntegryJS.RenderModes.INLINE,
      });
    };
    init();
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      <div className='App-embed' id='my-sdk-container' />
    </div>
  );
}

export default App;
