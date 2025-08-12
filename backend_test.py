#!/usr/bin/env python3
"""
Backend API Testing for Contacts API
Tests the /api/contacts endpoints and validates functionality
"""

import requests
import json
import time
from datetime import datetime
from typing import Dict, Any

# Base URL for testing - using internal service URL
BASE_URL = "http://localhost:8001"
API_BASE = f"{BASE_URL}/api"

class ContactsAPITester:
    def __init__(self):
        self.test_results = []
        self.created_contacts = []
        
    def log_test(self, test_name: str, passed: bool, details: str = ""):
        """Log test results"""
        status = "✅ PASS" if passed else "❌ FAIL"
        result = f"{status}: {test_name}"
        if details:
            result += f" - {details}"
        print(result)
        self.test_results.append({
            'test': test_name,
            'passed': passed,
            'details': details
        })
        
    def test_root_endpoint(self):
        """Test GET /api/ returns Hello World"""
        try:
            response = requests.get(f"{API_BASE}/")
            
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    self.log_test("GET /api/ Hello World", True, f"Response: {data}")
                else:
                    self.log_test("GET /api/ Hello World", False, f"Wrong message: {data}")
            else:
                self.log_test("GET /api/ Hello World", False, f"Status: {response.status_code}")
                
        except Exception as e:
            self.log_test("GET /api/ Hello World", False, f"Exception: {str(e)}")
    
    def test_cors_headers(self):
        """Test CORS headers for OPTIONS and POST requests"""
        try:
            # Test OPTIONS request
            options_response = requests.options(f"{API_BASE}/contacts")
            
            cors_headers_present = (
                'access-control-allow-origin' in options_response.headers and
                'access-control-allow-methods' in options_response.headers and
                'access-control-allow-headers' in options_response.headers
            )
            
            origin_wildcard = options_response.headers.get('access-control-allow-origin') == '*'
            
            if cors_headers_present and origin_wildcard:
                self.log_test("CORS Headers Present", True, "Wildcard origin allowed")
            else:
                self.log_test("CORS Headers Present", False, f"Headers: {dict(options_response.headers)}")
                
        except Exception as e:
            self.log_test("CORS Headers Present", False, f"Exception: {str(e)}")
    
    def test_post_contact_valid(self):
        """Test POST /api/contacts with valid data"""
        valid_contact = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "message": "This is a test message for the contact form."
        }
        
        try:
            response = requests.post(
                f"{API_BASE}/contacts",
                json=valid_contact,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 201:
                data = response.json()
                
                # Check required fields
                has_id = 'id' in data and data['id']
                has_created_at = 'created_at' in data and data['created_at']
                has_input_data = (
                    data.get('name') == valid_contact['name'] and
                    data.get('email') == valid_contact['email'] and
                    data.get('message') == valid_contact['message']
                )
                
                if has_id and has_created_at and has_input_data:
                    self.created_contacts.append(data)
                    self.log_test("POST /api/contacts Valid Data", True, f"Created contact with ID: {data['id']}")
                else:
                    self.log_test("POST /api/contacts Valid Data", False, f"Missing fields in response: {data}")
            else:
                self.log_test("POST /api/contacts Valid Data", False, f"Status: {response.status_code}, Body: {response.text}")
                
        except Exception as e:
            self.log_test("POST /api/contacts Valid Data", False, f"Exception: {str(e)}")
    
    def test_post_contact_missing_fields(self):
        """Test POST /api/contacts with missing required fields"""
        test_cases = [
            ({}, "Empty body"),
            ({"name": "John"}, "Missing email and message"),
            ({"email": "john@example.com"}, "Missing name and message"),
            ({"message": "Hello"}, "Missing name and email"),
            ({"name": "John", "email": "john@example.com"}, "Missing message"),
        ]
        
        for invalid_data, description in test_cases:
            try:
                response = requests.post(
                    f"{API_BASE}/contacts",
                    json=invalid_data,
                    headers={"Content-Type": "application/json"}
                )
                
                if response.status_code == 422:
                    self.log_test(f"POST Validation - {description}", True, "Correctly returned 422")
                else:
                    self.log_test(f"POST Validation - {description}", False, f"Status: {response.status_code}")
                    
            except Exception as e:
                self.log_test(f"POST Validation - {description}", False, f"Exception: {str(e)}")
    
    def test_post_contact_invalid_email(self):
        """Test POST /api/contacts with invalid email"""
        invalid_emails = [
            "not-an-email",
            "missing@",
            "@missing.com",
            "spaces in@email.com",
            ""
        ]
        
        for invalid_email in invalid_emails:
            contact_data = {
                "name": "Test User",
                "email": invalid_email,
                "message": "Test message"
            }
            
            try:
                response = requests.post(
                    f"{API_BASE}/contacts",
                    json=contact_data,
                    headers={"Content-Type": "application/json"}
                )
                
                if response.status_code == 422:
                    self.log_test(f"POST Invalid Email - {invalid_email}", True, "Correctly returned 422")
                else:
                    self.log_test(f"POST Invalid Email - {invalid_email}", False, f"Status: {response.status_code}")
                    
            except Exception as e:
                self.log_test(f"POST Invalid Email - {invalid_email}", False, f"Exception: {str(e)}")
    
    def test_post_contact_oversized_message(self):
        """Test POST /api/contacts with message > 4000 characters"""
        oversized_message = "A" * 4001  # 4001 characters
        
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "message": oversized_message
        }
        
        try:
            response = requests.post(
                f"{API_BASE}/contacts",
                json=contact_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 422:
                self.log_test("POST Oversized Message (>4000)", True, "Correctly returned 422")
            else:
                self.log_test("POST Oversized Message (>4000)", False, f"Status: {response.status_code}")
                
        except Exception as e:
            self.log_test("POST Oversized Message (>4000)", False, f"Exception: {str(e)}")
    
    def test_get_contacts_list(self):
        """Test GET /api/contacts returns list sorted by created_at desc"""
        # First create a few more contacts to test sorting
        test_contacts = [
            {"name": "Alice Smith", "email": "alice@example.com", "message": "First message"},
            {"name": "Bob Johnson", "email": "bob@example.com", "message": "Second message"},
        ]
        
        # Create contacts with small delays to ensure different timestamps
        for contact in test_contacts:
            try:
                response = requests.post(f"{API_BASE}/contacts", json=contact)
                if response.status_code == 201:
                    self.created_contacts.append(response.json())
                time.sleep(0.1)  # Small delay
            except:
                pass
        
        try:
            response = requests.get(f"{API_BASE}/contacts")
            
            if response.status_code == 200:
                contacts = response.json()
                
                if isinstance(contacts, list):
                    # Check if we have contacts
                    if len(contacts) > 0:
                        # Check if sorted by created_at desc (newest first)
                        is_sorted = True
                        for i in range(len(contacts) - 1):
                            current_time = datetime.fromisoformat(contacts[i]['created_at'].replace('Z', '+00:00'))
                            next_time = datetime.fromisoformat(contacts[i+1]['created_at'].replace('Z', '+00:00'))
                            if current_time < next_time:
                                is_sorted = False
                                break
                        
                        # Check if our created contacts are in the list
                        created_ids = {c['id'] for c in self.created_contacts}
                        returned_ids = {c['id'] for c in contacts}
                        contains_created = created_ids.issubset(returned_ids)
                        
                        if is_sorted and contains_created:
                            self.log_test("GET /api/contacts List & Sort", True, f"Found {len(contacts)} contacts, properly sorted")
                        else:
                            self.log_test("GET /api/contacts List & Sort", False, f"Sorting: {is_sorted}, Contains created: {contains_created}")
                    else:
                        self.log_test("GET /api/contacts List & Sort", False, "No contacts returned")
                else:
                    self.log_test("GET /api/contacts List & Sort", False, f"Response not a list: {type(contacts)}")
            else:
                self.log_test("GET /api/contacts List & Sort", False, f"Status: {response.status_code}")
                
        except Exception as e:
            self.log_test("GET /api/contacts List & Sort", False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all tests in sequence"""
        print("=" * 60)
        print("BACKEND API TESTING - CONTACTS API")
        print("=" * 60)
        
        # Test existing endpoints
        self.test_root_endpoint()
        
        # Test CORS
        self.test_cors_headers()
        
        # Test POST with valid data
        self.test_post_contact_valid()
        
        # Test POST validation
        self.test_post_contact_missing_fields()
        self.test_post_contact_invalid_email()
        self.test_post_contact_oversized_message()
        
        # Test GET functionality
        self.test_get_contacts_list()
        
        # Summary
        print("\n" + "=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result['passed'])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        
        if total - passed > 0:
            print("\nFAILED TESTS:")
            for result in self.test_results:
                if not result['passed']:
                    print(f"  - {result['test']}: {result['details']}")
        
        return passed == total

if __name__ == "__main__":
    tester = ContactsAPITester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 ALL TESTS PASSED!")
        exit(0)
    else:
        print("\n❌ SOME TESTS FAILED!")
        exit(1)