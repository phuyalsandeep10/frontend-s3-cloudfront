
import { useQuery } from "@tanstack/react-query";
import { riskAlertService } from "@/services/riskAlertService";

export function useRiskAlertDetails(alertId: string, enabled = true) {
  return useQuery({
    queryKey: ["riskAlertDetails", alertId],
    queryFn: () => riskAlertService.getAlertDetails(alertId),
    enabled: enabled && !!alertId
  });
}
