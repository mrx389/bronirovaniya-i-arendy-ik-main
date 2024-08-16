'use client';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FormEventHandler } from 'react';


const CreateUser = () => {
  const router = useRouter();
  const handleSubmit:FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });
    if (res && !res.error) {
      router.push('/profile');
    } else {
      console.error(res);
    }
  };
  return (
    <form onSubmit={handleSubmit} className='login-form'>
      <input
        type="email" name="email" required placeholder='email'
      />
      <input
        type="text" name="name" required placeholder='name'
      />
      <input
        type="password" name="password" required placeholder='password'
      />
      <select name="role" required>
        <option value="">Select a role</option>
        <option value="CONTENT_MANAGER">Content Manager</option>
        <option value="ADMIN">Admin</option>
      </select>
      <button type='submit'>Sign In</button>
    </form>
  );
};

export default CreateUser;
