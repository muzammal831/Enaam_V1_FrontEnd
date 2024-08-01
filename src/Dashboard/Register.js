


// import React, { useState } from 'react';
// import axios from 'axios';
// function Register() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [passwordConfirmation, setPasswordConfirmation] = useState('');
//     const [phone, setPhone] = useState('');
//     const [otp, setOtp] = useState('');
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const [step, setStep] = useState(1);
//     const handleRegister = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8000/api/register', {
//                 name,
//                 email,
//                 password,
//                 password_confirmation: passwordConfirmation,
//                 phone
//             });
//             setMessage(response.data.message);
//             setStep(2);
//         } catch (error) {
//             setError('Registration failed. Please check your input and try again.');
//             setMessage('');
//             console.error(error);
//         }
//     };
//     const handleVerifyOtp = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8000/api/verify-otp', {
//                 phone,
//                 otp
//             });
//             localStorage.setItem('token', response.data.token);
//             setMessage('Registration successful!');
//             setError('');
//         } catch (error) {
//             setError('OTP verification failed. Please try again.');
//             setMessage('');
//             console.error(error);
//         }
//     };
//     return (
//         <div className="container-fluid">
//             {step === 1 && (
//                 <div className="row justify-content-start text-start">
//                     <div className="col-md-12">
//                         <div className="card border-0">
                            
//                             <div className="card-body">
//                                 <form onSubmit={handleRegister}>
//                                     <div className="mb-3">
//                                         <label htmlFor="name" classNamejsx="form-label">Name</label>
//                                         <input
//                                             type="text"
//                                             id="name"
//                                             className="form-control"
//                                             placeholder="Enter your name"
//                                             value={name}
//                                             onChange={(e) => setName(e.target.value)}
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="email" className="form-label">Email</label>
//                                         <input
//                                             type="email"
//                                             id="email"
//                                             className="form-control"
//                                             placeholder="Enter your email"
//                                             value={email}
//                                             onChange={(e) => setEmail(e.target.value)}
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="password" className="form-label">Password</label>
//                                         <input
//                                             type="password"
//                                             id="password"
//                                             className="form-control"
//                                             placeholder="Enter your password"
//                                             value={password}
//                                             onChange={(e) => setPassword(e.target.value)}
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="passwordConfirmation" className="form-label">Confirm Password</label>
//                                         <input
//                                             type="password"
//                                             id="passwordConfirmation"
//                                             className="form-control"
//                                             placeholder="Confirm your password"
//                                             value={passwordConfirmation}
//                                             onChange={(e) => setPasswordConfirmation(e.target.value)}
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="phone" className="form-label">Phone</label>
//                                         <input
//                                             type="text"
//                                             id="phone"
//                                             className="form-control"
//                                             placeholder="Enter your phone number"
//                                             value={phone}
//                                             onChange={(e) => setPhone(e.target.value)}
//                                             required
//                                         />
//                                     </div>
//                                     <button type="submit" className="btn btn-primary">Register</button>
//                                 </form>
//                                 {message && <p className="text-success mt-3">{message}</p>}
//                                 {error && <p className="text-danger mt-3">{error}</p>}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             {step === 2 && (
//                 <div className="row justify-content-start text-start">
//                     <div className="col-md-12">
//                         <div className="card border-0">
                           
//                             <div className="card-body">
//                                 <form onSubmit={handleVerifyOtp}>
//                                     <div className="mb-3">
//                                         <label htmlFor="otp" className="form-label">OTP</label>
//                                         <input
//                                             type="text"
//                                             id="otp"
//                                             className="form-control"
//                                             placeholder="Enter OTP"
//                                             value={otp}
//                                             onChange={(e) => setOtp(e.target.value)}
//                                             required
//                                         />
//                                     </div>
//                                     <button type="submit" className="btn btn-primary">Verify OTP</button>
//                                 </form>
//                                 {message && <p className="text-success mt-3">{message}</p>}
//                                 {error && <p className="text-danger mt-3">{error}</p>}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
// export default Register;


import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
                phone
            });
            setMessage(response.data.message);
            setStep(2);
        } catch (error) {
            setError('Registration failed. Please check your input and try again.');
            setMessage('');
            console.error(error);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/verify-otp', {
                phone,
                otp
            });
            localStorage.setItem('token', response.data.token);
            setMessage('Registration successful!');
            setError('');
            // Reload the page after successful registration
            setTimeout(() => {
                window.location.reload();
            }, 1000); // Delay to allow message to display before reload
        } catch (error) {
            setError('OTP verification failed. Please try again.');
            setMessage('');
            console.error(error);
        }
    };

    return (
        <div className="container-fluid">
            {step === 1 && (
                <div className="row justify-content-start text-start">
                    <div className="col-md-12">
                        <div className="card border-0">
                            <div className="card-body">
                                <form onSubmit={handleRegister}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="form-control"
                                            placeholder="Enter your name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="passwordConfirmation" className="form-label">Confirm Password</label>
                                        <input
                                            type="password"
                                            id="passwordConfirmation"
                                            className="form-control"
                                            placeholder="Confirm your password"
                                            value={passwordConfirmation}
                                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            className="form-control"
                                            placeholder="Enter your phone number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Register</button>
                                </form>
                                {message && <p className="text-success mt-3">{message}</p>}
                                {error && <p className="text-danger mt-3">{error}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {step === 2 && (
                <div className="row justify-content-start text-start">
                    <div className="col-md-12">
                        <div className="card border-0">
                            <div className="card-body">
                                <form onSubmit={handleVerifyOtp}>
                                    <div className="mb-3">
                                        <label htmlFor="otp" className="form-label">OTP</label>
                                        <input
                                            type="text"
                                            id="otp"
                                            className="form-control"
                                            placeholder="Enter OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Verify OTP</button>
                                </form>
                                {message && <p className="text-success mt-3">{message}</p>}
                                {error && <p className="text-danger mt-3">{error}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Register;
