export default class UserMessages {

  // Call Analytics
  public static readonly UPLOAD_SUCCESS = 'File uploaded successfully';
  public static readonly UPLOAD_ERROR = 'Error uploading file';

  // Main Dashboard

  // Email Analytics

  // Social Media Analytics

  // Common
  public static readonly SAVED_SUCCESS = 'Your changes have been saved successfully';
  public static readonly SAVED_ERROR = 'Failed to save changes';
  public static readonly FETCH_ERROR = 'Failed to get the data';
  public static deleteSuccess(entity: string): string {
    return `${entity} deleted successfully`;
  }
}
