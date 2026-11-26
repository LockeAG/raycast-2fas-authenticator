import { Clipboard, showHUD, showToast, Toast } from "@raycast/api";
import { loadVault, isVaultConfigured, type VaultService } from "./lib/vault";
import { generateCodeForService } from "./lib/totp";
import { getCachedServices, addRecentService } from "./lib/cache";
import { withVaultUnlock, reportVaultLoadError } from "./lib/vault-ui";

const fail = (title: string) =>
  showToast({ style: Toast.Style.Failure, title });

export default async function CopyLastUsedOTP() {
  try {
    const recents = await getCachedServices();
    if (recents.length === 0) return fail("No recent services");
    const last = recents.reduce((a, b) => (b.lastUsed > a.lastUsed ? b : a));
    if (!isVaultConfigured()) return fail("No vault configured");

    let services: VaultService[];
    try {
      services = await withVaultUnlock(() => loadVault());
    } catch (error) {
      return reportVaultLoadError(error);
    }

    const service = services.find((s) => s.id === last.serviceId);
    if (!service) return fail("Service not found in vault");

    const label = service.issuer || service.name;
    const shared = services.some(
      (s) => s.id !== service.id && (s.issuer || s.name) === label,
    );
    const shown =
      shared && service.account ? `${label} (${service.account})` : label;

    await Clipboard.copy(generateCodeForService(service).code, {
      concealed: true,
    });
    await addRecentService(service.id, label);
    await showHUD(`Copied OTP for ${shown}`);
  } catch {
    await fail("Could not copy OTP");
  }
}
