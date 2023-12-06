import { User } from "./user";

export interface ChackTokenResponse {
    user: User;
    jwt:  string;
}
