#!/usr/bin/env python3
"""
Create a test user and immediately test login
"""

from app.auth import get_password_hash, verify_password, create_access_token
from app.database import get_db
from app.models import User
from sqlmodel import Session, select, create_engine
from datetime import timedelta

def create_and_test_user():
    """Create a test user and immediately test login"""
    
    print("🧪 Creating and testing user...")
    
    # Test credentials
    test_email = "debug@example.com"
    test_username = "debuguser"
    test_password = "debugpass123"
    
    try:
        engine = create_engine("sqlite:///./blog.db", echo=False)
        
        with Session(engine) as session:
            # Remove existing test user
            existing_user = session.exec(select(User).where(User.email == test_email)).first()
            if existing_user:
                session.delete(existing_user)
                session.commit()
                print(f"🗑️ Removed existing test user")
            
            # Create new user
            print(f"👤 Creating user: {test_email}")
            print(f"   Username: {test_username}")
            print(f"   Password: {test_password}")
            
            # Hash password
            hashed_password = get_password_hash(test_password)
            print(f"🔐 Password hashed: {hashed_password[:50]}...")
            
            # Create user
            new_user = User(
                username=test_username,
                email=test_email,
                password=hashed_password,
                about="Debug test user",
                profile_pic=None
            )
            
            session.add(new_user)
            session.commit()
            session.refresh(new_user)
            
            print(f"✅ User created with ID: {new_user.id}")
            
            # Immediately test password verification
            print(f"\n🔍 Testing password verification...")
            is_valid = verify_password(test_password, new_user.password)
            print(f"Password verification: {'✅ VALID' if is_valid else '❌ INVALID'}")
            
            if not is_valid:
                print("❌ PASSWORD VERIFICATION FAILED!")
                return False
            
            # Test token creation
            print(f"\n🎫 Testing token creation...")
            token = create_access_token(
                data={"sub": new_user.username},
                expires_delta=timedelta(minutes=30)
            )
            print(f"Token created: {token[:50]}...")
            
            print(f"\n✅ ALL TESTS PASSED!")
            print(f"   Email: {test_email}")
            print(f"   Password: {test_password}")
            print(f"   Username: {test_username}")
            print(f"   User ID: {new_user.id}")
            
            return True
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        import traceback
        print(traceback.format_exc())
        return False

if __name__ == "__main__":
    create_and_test_user()