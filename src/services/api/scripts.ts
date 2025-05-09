import { ScriptsResponse } from '@/lib/types/scripts';
import {
    ServiceCategoriesResponse,
    UpdateServiceParamsRequest,
} from '@/lib/types/service-params';
import { axiosInstance } from '@/services/api/axios-instance';

export async function fetchScripts(
    carWashId: number
): Promise<ScriptsResponse> {
    const response = await axiosInstance.get<ScriptsResponse>('/api/scripts', {
        params: { car_wash_id: carWashId },
    });

    return response.data;
}

export async function createScript(
    name: string,
    car_wash_id: number
): Promise<string> {
    const response = await axiosInstance.post<string>('/api/create_script', {
        name,
        car_wash_id,
    });

    return response.data;
}

export async function deleteScript(script_id: number): Promise<string> {
    const response = await axiosInstance.delete<string>('/api/delete_script', {
        params: { script_id },
    });

    return response.data;
}

export async function createScriptVersion(
    script_id: number,
    name: string
): Promise<string> {
    const response = await axiosInstance.post<string>(
        '/api/script_version/create',
        {
            script_id,
            name,
        }
    );

    return response.data;
}

export async function deleteScriptVersion(
    script_version_id: number
): Promise<string> {
    const response = await axiosInstance.delete<string>(
        `/api/script_version/${script_version_id}/delete`
    );
    return response.data;
}

export async function getScriptServiceParams(
    script_id: number
): Promise<ServiceCategoriesResponse> {
    const response = await axiosInstance.get<ServiceCategoriesResponse>(
        `/api/script/${script_id}/service_params`
    );
    return response.data;
}

export async function updateScriptServiceParams(
    script_id: number,
    data: UpdateServiceParamsRequest
): Promise<string> {
    const response = await axiosInstance.patch<string>(
        `/api/script/${script_id}/service_params`,
        data
    );
    return response.data;
}

export async function deleteScriptService(
    script_id: number,
    script_service_id: number
): Promise<string> {
    const response = await axiosInstance.delete<string>(
        `/api/script/${script_id}/services`,
        {
            params: { script_service_id },
        }
    );
    return response.data;
}

export async function addScriptService(
    script_id: number,
    service_id: number
): Promise<string> {
    const response = await axiosInstance.post<string>(
        `/api/script/${script_id}/service`,
        null, 
        {
            params: { service_id },
        }
    );
    return response.data;
}
