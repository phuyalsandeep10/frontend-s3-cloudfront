
import { useQuery } from "@tanstack/react-query";
import { apiDocumentationService } from "@/services/apiDocumentationService";
import { ApiDocumentation, ApiCategory } from "@/domain/models/apiDocumentation";

export const useApiDocumentation = () => {
  const {
    data: apiDocs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["api-documentation"],
    queryFn: apiDocumentationService.getApiDocumentation,
  });

  return {
    apiDocs,
    isLoading,
    error,
  };
};

export const useApiCategories = () => {
  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["api-categories"],
    queryFn: apiDocumentationService.getApiCategories,
  });

  return {
    categories,
    isLoading,
    error,
  };
};

export const useApiCategory = (categoryId: string) => {
  const {
    data: category,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["api-category", categoryId],
    queryFn: () => apiDocumentationService.getApiCategoryById(categoryId),
    enabled: !!categoryId,
  });

  return {
    category,
    isLoading,
    error,
  };
};

export const useApiEndpoint = (endpointId: string) => {
  const {
    data: endpoint,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["api-endpoint", endpointId],
    queryFn: () => apiDocumentationService.getApiEndpointById(endpointId),
    enabled: !!endpointId,
  });

  return {
    endpoint,
    isLoading,
    error,
  };
};
