import { Router } from "~/Router";
import { Shortcut } from "~/Shortcut";
import { Theme } from "~/Theme";

import { BottomBar } from "./BottomBar";
import { Providers } from "./Providers";
import { Sidebar, Sidebars } from "./Sidebar";
import { TopBar } from "./TopBar";
import {
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";
import { Environment } from "~/Environment";

interface GoogleLoginProps {
  setIsLogin: (value: boolean) => void;
}

function MyGoogleLogin({ setIsLogin }: GoogleLoginProps) {
  const [showLogin, setShowLogin] = useState(true);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log(
      //   "🚀 ~ file: index.tsx:31 ~ onSuccess: ~ tokenResponse:",
      //   tokenResponse,
      //   tokenResponse.hd == "heaven.fr"
      // );
      if (tokenResponse.hd == "heaven.fr") {
        setShowLogin(false);
        setIsLogin(true);
      }
    },
    onError: (error) => {
      console.log("🚀 ~ file: index.tsx:34 ~ onError: ~ error", error);
    },
  });

  return (
    <div className="absolute left-0 top-0 flex h-screen w-screen flex-col text-white sm:overflow-x-auto">
      {showLogin && <button onClick={(event) => login()}>Login</button>}
    </div>
  );
}

export function App() {
  const [isLogin, setIsLogin] = useState(false);

  const isMobileDevice = Theme.useIsMobileDevice();

  let application = <></>;
  if (isLogin) {
    application = (
      <div className="absolute left-0 top-0 flex h-screen w-screen flex-col text-white sm:overflow-x-auto">
        <Shortcut.Palette />
        <TopBar />
        <Sidebars />
        <div className="flex min-h-0 grow overflow-auto sm:min-w-[1000px]">
          <Sidebar position="left" />
          <div className="shrink grow overflow-y-auto">
            <Router />
          </div>
          <Sidebar position="right" />
        </div>
        {isMobileDevice && <BottomBar />}
      </div>
    );
  }


  return (
    <Providers>
      <GoogleOAuthProvider clientId={Environment.get("GOOGLE_CLIENT_ID")}>
        <div className="absolute left-0 top-0 -z-50 h-screen w-screen dark:bg-zinc-800" />
        {/* {!isLogin && <GoogleLogin setIsLogin={setIsLogin} />} */}
        <div key={`islogin_${isLogin}`}>
          <MyGoogleLogin
            setIsLogin={(v) => {
              setIsLogin(v);
            }}
          />
          <label>{`islogin : ${isLogin}`}</label>
          {application}
        </div>
      </GoogleOAuthProvider>
    </Providers>
  );

  // return useMemo(
  //   () => (
  //     <Providers>
  //       <GoogleOAuthProvider clientId="161910606401-h76eec9mg35p9p862578p50vnhjuqn1p.apps.googleusercontent.com">
  //         <div className="absolute left-0 top-0 -z-50 h-screen w-screen dark:bg-zinc-800" />
  //         {/* {!isLogin && <GoogleLogin setIsLogin={setIsLogin} />} */}
  //         <div key={`islogin_${isLogin}`}>
  //           <GoogleLogin
  //             setIsLogin={(v) => {
  //               console.log("setIsLogin", v);
  //               setIsLogin(v);
  //             }}
  //           />
  //           <label>{`islogin : ${isLogin}`}</label>
  //           {application}
  //         </div>
  //       </GoogleOAuthProvider>
  //     </Providers>
  //   ),
  //   [isMobileDevice, isLogin]
  // );
}

export declare namespace App {
  export { Sidebar, TopBar };
}

export namespace App {
  App.Sidebar = Sidebar;
  App.TopBar = TopBar;
}
