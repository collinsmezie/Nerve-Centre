export const REGION_ENUM = [
  'gauteng',
  'free-state',
  'eastern-cape',
  'kwazulu-natal',
  'limpopo',
  'mpumalanga',
  'northern-cape',
  'north-west',
  'western-cape',
  'custom',
];

export enum ActionStatus {
  ACKNOWLEDGED = 'acknowledged',
  SUSPENDED = 'suspended',
  REALLOCATE = 'reallocate',
}

export enum EventGroupType {
  HIJACKING = 'HIJACKING',
  FATIGUE = 'FATIGUE',
  NO_VALID_DRIVER = 'NO_VALID_DRIVER',
  DEVICE_ABNORMALITY = 'DEVICE_ABNORMALITY',
  POWER_ABNORMALITY = 'POWER_ABNORMALITY',
  CAMERA_ABNORMALITY = 'CAMERA_ABNORMALITY',
  VEHICLE_ABNORMALITY = 'VEHICLE_ABNORMALITY',
  HIGH_RISK = 'HIGH_RISK',
  NO_GO_ZONE = 'NO_GO_ZONE',
}

export const LICENSE_CODE_ENUM = [
  'code-a',
  'code-b',
  'code-c1',
  'code-c',
  'code-eb',
  'code-ec1',
  'code-ec',
];

export enum GeoFenceType {
  REGULAR = 'regular',
  SPECIAL = 'special',
}

export enum HourEnum {
  H3 = 3,
  H6 = 6,
  H9 = 9,
  H12 = 12,
  H24 = 24,
}

export enum ShapeType {
  CIRCLE = 'circle',
  POLYGON = 'polygon',
}
