import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useUserAuth } from "../lib/useUserAuth.ts";
import { Link, Navigate } from "react-router-dom";
import { GoogleIcon } from "@/components/icons/GoogleIcon.tsx";
import { useTranslation } from 'react-i18next';

function Homepage() {
  const { data: user } = useUserAuth();
  const {t} = useTranslation();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <div
        className={
          "flex h-screen justify-center items-center align-middle min-h-screen"
        }
      >
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <img
              src={"/excali_logo-sm.png"}
              alt={"Logo"}
              className="w-auto h-32 mb-5"
            />
            <CardTitle className="text-2xl text-center">
              {t('homePage.title')}
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className={"text-center"}>
            <Link
              to={`${import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_AUTH_REDIRECT_URL}`}
            >
              <Button className={"font-bold"}>
                <div className="mr-2 h-4 w-4">
                  <GoogleIcon />
                </div>
                {t('homePage.googleButton')}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Homepage;
