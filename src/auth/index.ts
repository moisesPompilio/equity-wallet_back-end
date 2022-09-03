import { CreateToken } from './CreateToken';
import { EncryptPassword } from './EncryptPassword';
import { IdetificationUser } from './IdentificationUser';
import { RefreshToken } from './RefreshToken';
import { VerifyPassword } from './VerifyPassword';
import { VerifyToken } from './VerifyToken';

const createToken = new CreateToken();

const encryptPassword = new EncryptPassword();

const idetificationUser = new IdetificationUser();

const refreshToken = new RefreshToken();

const verifyPassword = new VerifyPassword();

const verifyToken = new VerifyToken();

export {createToken, encryptPassword, idetificationUser, refreshToken, verifyPassword, verifyToken};