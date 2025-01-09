<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function signup(Request $request)
    
    {
        \Log::info('Signup method called');
        $validator = Validator::make($request->all(), [
            'fname' => 'required|max:191',
            'lname' => 'required|max:191',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'specialization' => 'required|max:191',
            'license_num' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'validation_errors' => $validator->messages(),
            ], 422);
        }

        $user = User::create([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'specialization' => $request->specialization,
            'license_num' => $request->license_num,
        ]);

        $token = $user->createToken($user->email . '_Token')->plainTextToken;

        return response()->json([
            'status' => 200,
            'user' => $user->fname,
            'token' => $token,
            'message' => 'Registered Successfully',
        ], 200);
    }

    public function login(Request $request)
    {
        \Log::info('Signin method called');
        $validator= Validator::make($request->all(), [
            'email'=>'required|max:191',
            'password'=>'required',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }
        else
        {
            $user = User::where('email', $request->email)->first();
 
            if (! $user || ! Hash::check($request->password, $user->password)) 
            {
                return response()->json([
                    'status' => 401,
                    'message' => 'Invalid Credentials',
                ]);
            }
            else
            {
                $token = $user->createToken($user->email . '_Token')->plainTextToken;

                return response()->json([
                'status' => 200,
                'user' => $user->fname,
                'token' => $token,
                'message' => 'Logged In Successfully',
                ]);
            }
        }
    }

    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            'status'=> 200,
            'message'=> 'Logged Out Successfully',
    ]);
    }

}
