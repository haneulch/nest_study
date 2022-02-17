export class CommonUtils {
  public static randomUsername() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let username = '';
    for (let i = 0; i < 5; i++) {
      username += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return username;
  }
}
