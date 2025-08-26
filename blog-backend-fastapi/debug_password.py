#!/usr/bin/env python3
"""
Debug script to test password hashing and verification
"""

from app.auth import get_password_hash, verify_password
from app.database import get_db
from app.models import User
from sqlmodel import Session, select, create_engine
import sys

def test_password_functions():
    """Test password hashing and verification functions"""
    
    print("=" * 60)
    print("🧪 TESTING PASSWORD FUNCTIONS")
    print("=" * 60)
    
    # Test password hashing and verification
    test_password = "testpass123"
    
    print(f"\n1️⃣ Testing with password: '{test_password}'")
    
    # Hash the password
    print("📝 Hashing password...")
    hashed_password = get_password_hash(test_password)
    print(f"✅ Hashed password: {hashed_password}")
    print(f"   Length: {len(hashed_password)}")
    print(f"   Starts with: {hashed_password[:10]}...")
    
    # Verify the password
    print("\n🔍 Verifying password...")
    is_valid = verify_password(test_password, hashed_password)
    print(f"✅ Verification result: {'VALID' if is_valid else 'INVALID'}")
    
    # Test with wrong password
    print("\n🔍 Testing with wrong password...")
    wrong_password = "wrongpassword"
    is_valid_wrong = verify_password(wrong_password, hashed_password)
    print(f"❌ Wrong password result: {'VALID' if is_valid_wrong else 'INVALID'} (should be INVALID)")
    
    print("\n" + "=" * 60)

def test_database_users():
    """Check users in database and test their passwords"""
    
    print("\n🧪 TESTING DATABASE USERS")
    print("=" * 60)
    
    try:
        engine = create_engine("sqlite:///./blog.db", echo=False)
        
        with Session(engine) as session:
            # Get all users
            users = session.exec(select(User)).all()
            
            print(f"\n📊 Found {len(users)} users in database:")
            
            for i, user in enumerate(users, 1):
                print(f"\n{i}. User Details:")
                print(f"   ID: {user.id}")
                print(f"   Username: {user.username}")
                print(f"   Email: {user.email}")
                print(f"   Password Hash: {user.password[:50]}...")
                print(f"   Hash Length: {len(user.password)}")
                
                # Test common passwords with this user's hash
                test_passwords = [
                    "testpass123",
                    "password",
                    "123456",
                    "test123",
                    user.username  # Sometimes people use username as password
                ]
                
                print(f"   🔍 Testing passwords for {user.email}:")
                for pwd in test_passwords:
                    try:
                        is_valid = verify_password(pwd, user.password)
                        status = "✅ MATCH!" if is_valid else "❌ No match"
                        print(f"      '{pwd}': {status}")
                        
                        if is_valid:
                            print(f"      🎉 FOUND WORKING PASSWORD: '{pwd}'")
                            break
                    except Exception as e:
                        print(f"      '{pwd}': ERROR - {str(e)}")
                
                print("-" * 40)
                
    except Exception as e:
        print(f"❌ Database error: {str(e)}")

def test_specific_user_login(email, password):
    """Test login for a specific user"""
    
    print(f"\n🧪 TESTING SPECIFIC USER LOGIN")
    print("=" * 60)
    print(f"Email: {email}")
    print(f"Password: {password}")
    
    try:
        engine = create_engine("sqlite:///./blog.db", echo=False)
        
        with Session(engine) as session:
            # Find user by email
            user = session.exec(select(User).where(User.email == email)).first()
            
            if not user:
                print(f"❌ User not found with email: {email}")
                return False
            
            print(f"✅ User found:")
            print(f"   ID: {user.id}")
            print(f"   Username: {user.username}")
            print(f"   Email: {user.email}")
            print(f"   Stored hash: {user.password[:50]}...")
            
            # Test password verification
            print(f"\n🔍 Testing password verification...")
            is_valid = verify_password(password, user.password)
            print(f"Result: {'✅ VALID' if is_valid else '❌ INVALID'}")
            
            return is_valid
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

if __name__ == "__main__":
    # Test basic password functions
    test_password_functions()
    
    # Test database users
    test_database_users()
    
    # Test specific user if provided
    if len(sys.argv) == 3:
        email = sys.argv[1]
        password = sys.argv[2]
        test_specific_user_login(email, password)
    else:
        print(f"\n💡 To test specific user login:")
        print(f"   python {sys.argv[0]} email@example.com password123")