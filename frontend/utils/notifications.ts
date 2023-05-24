import { NotificationPlacement } from 'antd/es/notification/interface';

interface TemplateResult {
  message: string;
  description: string;
  placement: NotificationPlacement | undefined;
}

export function errorTemplate(message: string): TemplateResult {
  return {
    message: `Error`,
    description: `Action was not successful: ${message}.`,
    placement: `bottomRight`,
  };
}

export function infoTemplate(message: string): TemplateResult {
  return {
    message: `Info`,
    description: `Message: ${message}.`,
    placement: `bottomRight`,
  };
}
