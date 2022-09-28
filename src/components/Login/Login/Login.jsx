import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../../firebase';
import { authContext, useAuth} from '../../../context/AuthContext';
// import { userContext } from '../context/UserContext';
import { Spinner } from '../Spinner';
import style from './Login.module.css';
import { toast } from 'react-toastify';

export const Login = () => {
  const userContextResult = useContext(authContext);
  const [user, setUser] = useState({
    login_email: '',
    login_password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
       await login(
        user.login_email,
        user.login_password
      );

      // const q = query(
      //   collection(db, 'usuarios'),
      //   where('userId', '==', responseUser.user.uid)
      // );
      // const querySnapshot = await getDocs(q)
      // userContextResult.loginUser(querySnapshot.docs[0]?.data());
      setLoading(false);
      navigate('/');
      console.log("navegando a la home")
    } catch (error) {
      setLoading(false);

      if (error.code === 'auth/wrong-password') {
        toast.error('Contraseña incorrecta');
      } else if (error.code === 'auth/user-not-found') {
        toast.error('Usuario no encontrado. Por favor verifique los datos');
      } else if (error.code === 'auth/too-many-requests') {
        toast.error(
          'El acceso a esta cuenta se ha inhabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarlo inmediatamente restableciendo su contraseña o puede volver a intentarlo más tarde'
        );
      } else if (error.code === 'auth/invalid-email') {
        toast.error('E-mail invalido');
      } else {
        toast.error(error.message);
      }
      setUser({ login_email: '', login_password: '' });
    }
  };

  const handlerMultiple = (e) => {
    const target = e.target;
    const label = target.parentElement.children[0];
    const spanReq = label.children[0];

    if (e.type === 'keyup') {
      if (target.value === '') {
        label.classList.remove(`${style.activeLabel}`, `${style.highLight}`);
        spanReq.classList.remove(`${style.opacityCero}`);
      } else {
        label.classList.add(`${style.activeLabel}`, `${style.highLight}`);
        spanReq.classList.add(`${style.opacityCero}`);
      }
    } else if (e.type === 'blur') {
      if (target.value === '') {
        label.classList.remove(`${style.activeLabel}`, `${style.highLight}`);
      } else {
        label.classList.remove(`${style.highLight}`);
      }
    } else if (e.type === 'focus') {
      if (e.target.value === '') {
        label.classList.remove(`${style.highLight}`);
      } else if (e.target.value !== '') {
        label.classList.add(`${style.highLight}`);
      }
    }
  };

  return (
    <div
    className='login'>
      {loading ? (
        <Spinner />
      ) : (
        <div className={style.contenedorFormulario}>
          <h1 className={style.titleOutsideForm}>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className={style.contenedorInput}>
              <label className={style.label}>
                Email<span className={style.req}>*</span>
              </label>
              <input
                className={style.input}
                type="text"
                name="login_email"
                onChange={handleChange}
                onFocus={handlerMultiple}
                onBlur={handlerMultiple}
                onKeyUp={handlerMultiple}
                value={user.login_email}
              />
            </div>
            <div className={style.contenedorInput}>
              <label className={style.label}>
                Contraseña<span className={style.req}>*</span>
              </label>
              <input
                className={style.input}
                type="password"
                name="login_password"
                onChange={handleChange}
                onFocus={handlerMultiple}
                onBlur={handlerMultiple}
                onKeyUp={handlerMultiple}
                value={user.login_password}
              />
            </div>

            <button className={`${style.button}`}>Ingresar</button>

            <div>
              <Link to="/register">¿No tienes una cuenta? Regístrate aquí</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

