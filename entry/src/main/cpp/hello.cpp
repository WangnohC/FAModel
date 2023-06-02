#include "napi/native_api.h"

#define GET_AND_THROW_LAST_ERROR(env)                                                                   \
    do {                                                                                                \
        const napi_extended_error_info* errorInfo = nullptr;                                            \
        napi_get_last_error_info((env), &errorInfo);                                                    \
        bool isPending = false;                                                                         \
        if (!isPending && errorInfo != nullptr) {                                                       \
            const char* errorMessage =                                                                  \
                errorInfo->error_message != nullptr ? errorInfo->error_message : "empty error message"; \
            napi_throw_error((env), nullptr, errorMessage);                                             \
        }                                                                                               \
    } while (0)

#define NAPI_CALL_BASE(env, theCall, retVal) \
    do {                                     \
        if ((theCall) != napi_ok) {          \
            GET_AND_THROW_LAST_ERROR((env)); \
            return retVal;                   \
        }                                    \
    } while (0)

#define NAPI_CALL(env, theCall) NAPI_CALL_BASE(env, theCall, nullptr)

#define DECLARE_NAPI_FUNCTION(name, func)                                         \
    {                                                                             \
        (name), nullptr, (func), nullptr, nullptr, nullptr, napi_default, nullptr \
    }

static napi_value Hello(napi_env env, napi_callback_info info)
{
    napi_value value;
    NAPI_CALL(env, napi_create_string_utf8(env, "Hello World!", 12, &value));
    return value;
}

static napi_value Init(napi_env env, napi_value exports)
{
    napi_property_descriptor desc[] = {
        DECLARE_NAPI_FUNCTION("hello", Hello)
    };
    NAPI_CALL(env, napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc));
    return exports;
}

NAPI_MODULE(hello, Init)

