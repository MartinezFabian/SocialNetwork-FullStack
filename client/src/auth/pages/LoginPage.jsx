export const LoginPage = () => {
  return (
    <main>
      <div>
        <h1>Sign in</h1>

        <div>
          <form>
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" placeholder="username" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input type="text" id="password" name="password" placeholder="password" />
            </div>

            <div>
              <button type="submit">Sign in</button>
              <button>Register</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
