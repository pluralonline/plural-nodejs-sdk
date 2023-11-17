declare const _default: (merchant_id: string, merchant_access_code: string, merchant_secret: string, is_test: boolean) => {
    payment: {
        create: any;
        fetch: any;
    };
    emi: {
        calculate: any;
    };
    hash: {
        verify: any;
    };
};
export default _default;
