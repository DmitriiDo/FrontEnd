/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Rocket {
  /** ID */
  id?: number;
  /** Owner */
  owner?: string;
  /** Moderator */
  moderator?: string;
  /** Components */
  components?: string;
  /** Статус */
  status?: 1 | 2 | 3 | 4 | 5;
  /**
   * Дата создания
   * @format date-time
   */
  date_created?: string | null;
  /**
   * Дата формирования
   * @format date-time
   */
  date_formation?: string | null;
  /**
   * Дата завершения
   * @format date-time
   */
  date_complete?: string | null;
  /** Field */
  field?: string | null;
  /**
   * Weight
   * @min -2147483648
   * @max 2147483647
   */
  weight?: number | null;
}

export interface ComponentRocket {
  /** ID */
  id?: number;
  /**
   * Count
   * @min -2147483648
   * @max 2147483647
   */
  count?: number;
  /** Component */
  component?: number | null;
  /** Rocket */
  rocket?: number | null;
}

export interface UpdateRocketStatusAdmin {
  /** Status */
  status: number;
}

export interface ComponentAdd {
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Описание
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /**
   * Цена
   * @min -2147483648
   * @max 2147483647
   */
  price: number;
  /**
   * Фото
   * @format uri
   */
  image?: string | null;
}

export interface Component {
  /** ID */
  id?: number;
  /** Image */
  image?: string;
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Описание
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /** Статус */
  status?: 1 | 2;
  /**
   * Цена
   * @min -2147483648
   * @max 2147483647
   */
  price: number;
}

export interface UserLogin {
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface UserRegister {
  /** ID */
  id?: number;
  /**
   * Адрес электронной почты
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
}

export interface UserProfile {
  /**
   * Username
   * @minLength 1
   */
  username?: string;
  /**
   * Email
   * @minLength 1
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   */
  password?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000/api" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000/api
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  rockets = {
    /**
     * No description
     *
     * @tags rockets
     * @name RocketsList
     * @request GET:/rockets/
     * @secure
     */
    rocketsList: (
      query?: {
        status?: number;
        date_formation_start?: string;
        date_formation_end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/rockets/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags rockets
     * @name RocketsRead
     * @request GET:/rockets/{rocket_id}/
     * @secure
     */
    rocketsRead: (rocketId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/rockets/${rocketId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags rockets
     * @name RocketsDeleteDelete
     * @request DELETE:/rockets/{rocket_id}/delete/
     * @secure
     */
    rocketsDeleteDelete: (rocketId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/rockets/${rocketId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags rockets
     * @name RocketsDeleteComponentDelete
     * @request DELETE:/rockets/{rocket_id}/delete_component/{component_id}/
     * @secure
     */
    rocketsDeleteComponentDelete: (rocketId: string, componentId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/rockets/${rocketId}/delete_component/${componentId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags rockets
     * @name RocketsUpdateUpdate
     * @request PUT:/rockets/{rocket_id}/update/
     * @secure
     */
    rocketsUpdateUpdate: (rocketId: string, data: Rocket, params: RequestParams = {}) =>
      this.request<Rocket, any>({
        path: `/rockets/${rocketId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags rockets
     * @name RocketsUpdateComponentUpdate
     * @request PUT:/rockets/{rocket_id}/update_component/{component_id}/
     * @secure
     */
    rocketsUpdateComponentUpdate: (
      rocketId: string,
      componentId: string,
      data: ComponentRocket,
      params: RequestParams = {},
    ) =>
      this.request<ComponentRocket, any>({
        path: `/rockets/${rocketId}/update_component/${componentId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags rockets
     * @name RocketsUpdateStatusAdminUpdate
     * @request PUT:/rockets/{rocket_id}/update_status_admin/
     * @secure
     */
    rocketsUpdateStatusAdminUpdate: (
      rocketId: string,
      data: UpdateRocketStatusAdmin,
      params: RequestParams = {},
    ) =>
      this.request<UpdateRocketStatusAdmin, any>({
        path: `/rockets/${rocketId}/update_status_admin/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags rockets
     * @name RocketsUpdateStatusUserUpdate
     * @request PUT:/rockets/{rocket_id}/update_status_user/
     * @secure
     */
    rocketsUpdateStatusUserUpdate: (rocketId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/rockets/${rocketId}/update_status_user/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  components = {
    /**
     * No description
     *
     * @tags components
     * @name ComponentsList
     * @request GET:/components/
     * @secure
     */
    componentsList: (
      query?: {
        component_name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/components/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags components
     * @name ComponentsCreateCreate
     * @request POST:/components/create/
     * @secure
     */
    componentsCreateCreate: (
      data: {
        /**
         * @minLength 1
         * @maxLength 100
         */
        name: string;
        /**
         * @minLength 1
         * @maxLength 500
         */
        description: string;
        /**
         * @min -2147483648
         * @max 2147483647
         */
        price: number;
        /** @format binary */
        image?: File | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<ComponentAdd, any>({
        path: `/components/create/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags components
     * @name ComponentsRead
     * @request GET:/components/{component_id}/
     * @secure
     */
    componentsRead: (componentId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/components/${componentId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags components
     * @name ComponentsAddToRocketCreate
     * @request POST:/components/{component_id}/add_to_rocket/
     * @secure
     */
    componentsAddToRocketCreate: (componentId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/components/${componentId}/add_to_rocket/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags components
     * @name ComponentsDeleteDelete
     * @request DELETE:/components/{component_id}/delete/
     * @secure
     */
    componentsDeleteDelete: (componentId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/components/${componentId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags components
     * @name ComponentsUpdateUpdate
     * @request PUT:/components/{component_id}/update/
     * @secure
     */
    componentsUpdateUpdate: (componentId: string, data: Component, params: RequestParams = {}) =>
      this.request<Component, any>({
        path: `/components/${componentId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags components
     * @name ComponentsUpdateImageCreate
     * @request POST:/components/{component_id}/update_image/
     * @secure
     */
    componentsUpdateImageCreate: (
      componentId: string,
      data: {
        /** @format binary */
        image?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/components/${componentId}/update_image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersLoginCreate
     * @request POST:/users/login/
     * @secure
     */
    usersLoginCreate: (data: UserLogin, params: RequestParams = {}) =>
      this.request<UserLogin, any>({
        path: `/users/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersLogoutCreate
     * @request POST:/users/logout/
     * @secure
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterCreate
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: UserRegister, params: RequestParams = {}) =>
      this.request<UserRegister, any>({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdateUpdate
     * @request PUT:/users/{user_id}/update/
     * @secure
     */
    usersUpdateUpdate: (userId: string, data: UserProfile, params: RequestParams = {}) =>
      this.request<UserProfile, any>({
        path: `/users/${userId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
