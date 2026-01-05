

const UserTableSchema = {
  tableName: 'user_profiles',
  
  columns: {
    id: {
      type: 'UUID',
      constraints: ['PRIMARY KEY', 'FOREIGN KEY REFERENCES auth.users(id)'],
      purpose: 'Links to Supabase auth',
      required: true
    },
    
    first_name: {
      type: 'TEXT',
      constraints: ['NOT NULL'],
      purpose: 'Registration first name',
      required: true,
      validation: {
        minLength: 1,
        maxLength: 100
      }
    },
    
    last_name: {
      type: 'TEXT',
      constraints: ['NOT NULL'],
      purpose: 'Registration last name',
      required: true,
      validation: {
        minLength: 1,
        maxLength: 100
      }
    },
    
    email: {
      type: 'TEXT',
      constraints: ['UNIQUE'],
      purpose: 'User email (verified)',
      required: false,
      validation: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      }
    },
    
    mobile_number: {
      type: 'TEXT',
      constraints: ['UNIQUE', 'NOT NULL'],
      purpose: 'PH OTP login/verification',
      required: true,
      validation: {
        pattern: /^(\+63|0)[0-9]{10}$/,
        message: 'Must be valid Philippine mobile number'
      }
    },
    
    gender: {
      type: 'TEXT',
      constraints: ['CHECK (gender IN (\'Male\', \'Female\', \'Prefer not to say\'))'],
      purpose: 'Gender selection',
      required: false,
      enum: ['Male', 'Female', 'Prefer not to say']
    },
    
    age: {
      type: 'INTEGER',
      constraints: ['CHECK (age >= 13 AND age <= 100)'],
      purpose: 'Age validation',
      required: false,
      validation: {
        min: 13,
        max: 100
      }
    },
    
    enable_location: {
      type: 'BOOLEAN',
      constraints: ['DEFAULT true'],
      purpose: 'Feature flag for suggestions',
      required: false,
      default: true
    },
    
    created_at: {
      type: 'TIMESTAMP',
      constraints: ['DEFAULT NOW()'],
      purpose: 'Audit - record creation time',
      required: false,
      default: 'NOW()'
    },
    
    updated_at: {
      type: 'TIMESTAMP',
      constraints: ['DEFAULT NOW()'],
      purpose: 'Audit - last update time',
      required: false,
      default: 'NOW()'
    }
  },
  
  createTableSQL: `
    CREATE TABLE IF NOT EXISTS user_profiles (
      id UUID PRIMARY KEY REFERENCES auth.users(id),
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE,
      mobile_number TEXT UNIQUE NOT NULL,
      gender TEXT CHECK (gender IN ('Male', 'Female', 'Prefer not to say')),
      age INTEGER CHECK (age >= 13 AND age <= 100),
      enable_location BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `,
  
  indexes: [
    'CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);',
    'CREATE INDEX IF NOT EXISTS idx_user_profiles_mobile ON user_profiles(mobile_number);'
  ]
};

module.exports = UserTableSchema;