export class Configs {
    // public static API_HOST='http://localhost';
    public static API_HOST='http://localhost';
    public static API_PORT='57259';
    public static API_ENDPOINT_USERS='/api/Users';
    public static API_ENDPOINT_PRODUCTS='/api/Products/all';
    public static API_ENDPOINT_SIGNALR='/api/v1/signals';
    public static API_ENDPOINT_SIGNALHUB='/signalHub';

    public static URL_API_USERS=Configs.API_HOST+":"+Configs.API_PORT+Configs.API_ENDPOINT_USERS;
    public static URL_API_PRODUCTS=Configs.API_HOST+":"+Configs.API_PORT+Configs.API_ENDPOINT_PRODUCTS;
    public static URL_SIGNALHUB=Configs.API_HOST+":"+Configs.API_PORT+Configs.API_ENDPOINT_SIGNALHUB;
    
    public static URL_SIGNALR_GET=Configs.API_HOST+":"+Configs.API_PORT+Configs.API_ENDPOINT_SIGNALR+"/all";
    public static URL_SIGNALR_POST=Configs.API_HOST+":"+Configs.API_PORT+Configs.API_ENDPOINT_SIGNALR+"/order";
    public static URL_SIGNALR_PUT=Configs.API_HOST+":"+Configs.API_PORT+Configs.API_ENDPOINT_SIGNALR;
    public static URL_SIGNALR_DELETE=Configs.API_HOST+":"+Configs.API_PORT+Configs.API_ENDPOINT_SIGNALR;
 }