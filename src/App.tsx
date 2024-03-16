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

      // This is intended for use in testing only!
      // Please refer to docs.integry.io for more details
      const hash = await Helpers.getAuthHash(userId, appSecret);

      const integryHandle = new IntegryJS({
        appKey,
        hash,
        userId,
        xIntegryConfig: {
          appAuth: {
            apiKey: '<USER_API_KEY>', // replace with your end-user's API key
          },
        },
      });

      integryHandle.init({
        containerId: "my-sdk-container", /* Add the dom container id where you want to render sdk */
        showApps: true, /* Add this flag if you want to group Flows by App*/
        renderMode: IntegryJS.RenderModes.INLINE, /* View App List in a modal or inline? Pass IntegryJS.RenderModes.MODAL or IntegryJS.RenderModes.INLINE.*/
        viewStyle: IntegryJS.ViewStyles.COMFORTABLE, /* View Style: IntegryJS.ViewStyles.COMFORTABLE or IntegryJS.ViewStyles.COMPACT */
      });

      integryHandle.eventEmitter.on('ready', (data) => {
        console.log('ready', data);
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
