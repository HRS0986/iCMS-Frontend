export default class UserMessages {

  // Call Analytics
  public static readonly UPLOAD_SUCCESS = 'Your calls have been uploaded for analyze.';
  public static readonly UPLOAD_ERROR = 'Failed to upload files';

  // Main Dashboard

  // Email Analytics

  // Social Media Analytics

  // Common
  public static readonly SAVED_SUCCESS = 'Your changes have been saved successfully';
  public static readonly SAVED_ERROR = 'Failed to save changes';
  public static readonly FETCH_ERROR = 'Failed to get the data';
  public static readonly FETCH_ERROR_USER_MSG = 'Oops! It seems we\'re having trouble fetching the data right now. Please try again later.';
  public static deleteSuccess(entity: string): string {
    return `${entity} deleted successfully`;
  }
}
