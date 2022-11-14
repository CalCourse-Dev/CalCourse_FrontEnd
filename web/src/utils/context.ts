import { useState } from "react";

export const [allTerms, setAllTerms] = useState<string[]>([]);
export const [userEmail, setUserEmail] = useState<string>("");
export const [userAccessToken, setUserAccessToken] = useState<string>("");